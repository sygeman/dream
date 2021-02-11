import { PrismaService } from '@dream/prisma';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatService {
  constructor(
    private readonly config: ConfigService,
    private prisma: PrismaService
  ) {}
}
