import { HttpModule, Module } from '@nestjs/common';
import { PrismaModule } from '@dream/prisma';
import { UserResolver } from './user.resolver';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [],
  providers: [UserResolver],
  exports: [],
})
export class UserModule {}
