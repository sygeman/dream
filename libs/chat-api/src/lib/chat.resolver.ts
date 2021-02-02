import {
  ID,
  Query,
  Resolver,
  Mutation,
  Subscription,
  Args,
  Context,
} from '@nestjs/graphql';
import { UseGuards, Inject } from '@nestjs/common';
//   import { AuthGuard, ModGuard } from '../../guards';
import { ChatMessageCreateInput } from './dto/chatMessage.create.input';
//   import { ChatService } from './chat.service';
//   import { UsersService } from '../user/user.service';
import { ChatMessage } from './models/chatMessage';
import { PrismaService } from '@pepega/prisma';
import { AuthGuard } from '@pepega/auth-api';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Resolver((of) => ChatMessage)
export class ChatResolver {
  constructor(
    private readonly prisma: PrismaService, // private readonly userService: UsersService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @Query(() => [ChatMessage])
  async chatMessages(@Args({ name: 'chatId', type: () => ID }) chatId: string) {
    const messages = await this.prisma.chatMessage.findMany({
      where: {
        chatId,
        deleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
      include: {
        author: true,
      },
    });

    return messages.reverse();
  }

  @Mutation((returns) => Boolean)
  @UseGuards(AuthGuard)
  async createChatMessage(
    @Args('input') input: ChatMessageCreateInput,
    @Context('userId') userId: string
  ) {
    let { text, chatId } = input;
    text = text.trim();
    if (text.length === 0) {
      throw new Error('Empty message');
    }
    if (text.length > 500) {
      throw new Error('Too long message');
    }

    const chatMessage = await this.prisma.chatMessage.create({
      data: {
        content: text,
        chat: {
          connect: {
            id: chatId,
          },
        },
        author: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        author: true,
      },
    });

    this.pubsub.publish('chatMessageCreated', {
      chatMessageCreated: chatMessage,
    });
    return true;
  }

  // @Mutation(returns => Boolean)
  // @UseGuards(AuthGuard, ModGuard)
  // async deleteChatMessage(@Args({ name: 'id', type: () => ID }) id: string) {
  //   const chatMessage = await this.chatService.findOneMessage({
  //     where: { id },
  //   });
  //   if (!chatMessage) {
  //     throw new Error('The chatMessage not found');
  //   }
  //   await this.chatService.updateMessages({ id }, { deleted: true });
  //   const chatMessageDeleted = await this.chatService.findOneMessage({
  //     where: { id },
  //   });
  //   this.pubsub.publish('chatMessageDeleted', {
  //     chatMessageDeleted,
  //   });
  //   return true;
  // }
  @Subscription((returns) => ChatMessage, {
    filter: ({ chatMessageCreated }, { chatId }) =>
      chatMessageCreated.chatId === chatId,
  })
  chatMessageCreated(@Args({ name: 'chatId', type: () => ID }) chatId: string) {
    return this.pubsub.asyncIterator('chatMessageCreated');
  }

  @Subscription((returns) => ChatMessage, {
    filter: ({ chatMessageDeleted, chatId }) =>
      chatMessageDeleted.chatId === chatId,
  })
  chatMessageDeleted(@Args({ name: 'chatId', type: () => ID }) chatId: string) {
    return this.pubsub.asyncIterator('chatMessageDeleted');
  }
}
