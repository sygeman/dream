import { Processor, Process, InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { from, of } from 'rxjs';
import { delay, concatMap } from 'rxjs/internal/operators';

import { ConnectionsService } from './modules/connection/connection.service';
import { ChannelService } from './modules/channel/channel.service';
import { ChannelPromoterService } from './modules/channelPromoter/channelPromoter.service';
import { WalletService } from './modules/wallet/wallet.service';
import { Logger } from '@nestjs/common';

@Processor()
export class AppQueue {
  constructor(
    private readonly connectionsService: ConnectionsService,
    private readonly channelService: ChannelService,
    private readonly walletService: WalletService,
    private readonly channelPromoterService: ChannelPromoterService,
    @InjectQueue() readonly queue: Queue
  ) {
    this.queue.add('addCoinsOnlineUsers', null, { repeat: { every: 10e3 } });
    this.queue.add('updateCurrentPromoterStreams', null, {
      repeat: { every: 60e3 }
    });
    this.queue.add('deleteCoinsPromoter', null, { repeat: { every: 60e3 } });
    this.queue.add('updateRichChannels', null, { repeat: { every: 20e3 } });
  }

  @Process({ name: 'updateCurrentPromoterStreams' })
  async updateCurrentPromoterStreams() {
    Logger.log('updateCurrentPromoterStreams');

    // Get last list and save

    // Get new list
    // Remove points
  }

  @Process({ name: 'addCoinsOnlineUsers' })
  async addCoinsOnlineUsers() {
    const usersOnline = await this.connectionsService.findUserOnline();

    from(usersOnline)
      .pipe(concatMap(item => of(item).pipe(delay(50))))
      .subscribe(user => {
        this.walletService.incrementBalance({
          amount: 1,
          userId: user.userId,
          currency: 'coin'
        });
      });
  }

  @Process({ name: 'deleteCoinsPromoter' })
  async deleteCoinsPromoter() {
    const topChannels = await this.channelService.topChannels();

    from(topChannels).subscribe(async channel => {
      const channelPromoters = await this.channelPromoterService.find({
        channelId: channel.id
      });

      from(channelPromoters).subscribe(async channelPromoter => {
        // console.log(channel.name, channelPromoter.userId, channelPromoter.cost);

        await this.walletService
          .decrementBalance({
            amount: channelPromoter.cost,
            userId: channelPromoter.userId,
            currency: 'real'
          })
          .then(res => {
            if (!res.success) {
              // console.log(`Remove ${channelPromoter.id}`);
              this.channelPromoterService.updateById({
                id: channelPromoter.id,
                data: { active: false }
              });
            }
          });
      });
    });
  }

  @Process({ name: 'updateRichChannels' })
  async updateRichChannels() {
    return this.channelService.updateRichChannels();
  }
}
