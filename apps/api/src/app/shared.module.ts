import { Module, Global } from '@nestjs/common';
import { pubSubFactory } from './providers/pubsub.provider';
@Global()
@Module({
  imports: [],
  providers: [pubSubFactory],
  exports: [pubSubFactory],
})
export class SharedModule {}
