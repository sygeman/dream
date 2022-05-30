import { Process, Processor } from '@nestjs/bull';
import { ConnectionService } from './connection.service';

@Processor('connection')
export class ConnectionProcessor {
  constructor(private readonly connectionService: ConnectionService) {}

  @Process('cleanup')
  handleCleanup() {
    this.connectionService.cleanup();
  }
}
