import {
  Query,
  Resolver,
  Mutation,
  Subscription,
  Args,
  Context,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { UseGuards, Inject } from '@nestjs/common';
import { AuthGuard, ModGuard } from '../../guards';
import { ChatMessageCreateInput } from './dto/chatMessage.create.input';
import { ChatService } from './chat.service';
import { UsersService } from '../user/user.service';
import { ChatMessage } from './models/chatMessage';
import { ID } from 'type-graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../../constants';

@Resolver(of => ChatMessage)
export class ChatMessageResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UsersService,
    @Inject(PUB_SUB) private readonly pubsub: RedisPubSub,
  ) {}

  // TODO: Use fk query
  @ResolveProperty('author')
  async author(@Parent() comment) {
    const { authorId } = comment;
    return this.userService.findOne({ where: { id: authorId } });
  }

  @Query(returns => [ChatMessage])
  async chatMessages(
    @Args({ name: 'chatId', type: () => ID }) chatId: string,
    @Context('userId') userId: string,
  ) {
    const messages = await this.chatService.findMessages({
      where: { chatId, deleted: false },
      order: { createdAt: 'DESC' },
      take: 50,
    });

    return messages.reverse();
  }

  @Mutation(returns => Boolean)
  @UseGuards(AuthGuard)
  async createChatMessage(
    @Args('input') input: ChatMessageCreateInput,
    @Context('userId') userId: string,
  ) {
    let { text, chatId } = input;

    text = text.trim();

    if (text.length === 0) {
      throw new Error('Empty message');
    }

    if (text.length > 500) {
      throw new Error('Too long message');
    }

    const chatMessage = await this.chatService.createMessage({
      chatId,
      content: text,
      authorId: userId,
    });

    this.pubsub.publish('chatMessageCreated', {
      chatMessageCreated: chatMessage,
    });

    return true;
  }

  @Mutation(returns => Boolean)
  @UseGuards(AuthGuard, ModGuard)
  async deleteChatMessage(@Args({ name: 'id', type: () => ID }) id: string) {
    const chatMessage = await this.chatService.findOneMessage({
      where: { id },
    });

    if (!chatMessage) {
      throw new Error('The chatMessage not found');
    }

    await this.chatService.updateMessages({ id }, { deleted: true });

    const chatMessageDeleted = await this.chatService.findOneMessage({
      where: { id },
    });

    this.pubsub.publish('chatMessageDeleted', {
      chatMessageDeleted,
    });

    return true;
  }

  @Subscription(returns => ChatMessage, {
    filter: ({ chatMessageCreated }, { chatId }) =>
      chatMessageCreated.chatId === chatId,
  })
  chatMessageCreated(@Args({ name: 'chatId', type: () => ID }) chatId: string) {
    return this.pubsub.asyncIterator('chatMessageCreated');
  }

  @Subscription(returns => ChatMessage, {
    filter: ({ chatMessageDeleted, chatId }) =>
      chatMessageDeleted.chatId === chatId,
  })
  chatMessageDeleted(@Args({ name: 'chatId', type: () => ID }) chatId: string) {
    return this.pubsub.asyncIterator('chatMessageDeleted');
  }
}
