import * as ms from 'ms';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, LessThan } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { uniqBy } from 'lodash';
import { interval } from 'rxjs';
import { Connection as ConnectionEntity } from './connection.entity';
import { Instance as InstanceEntity } from './instances.entity';
import { UsersService } from '../user/user.service';

@Injectable()
export class ConnectionsService implements OnModuleInit {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(ConnectionEntity)
    private readonly connectionsRepository: Repository<ConnectionEntity>,
    @InjectRepository(InstanceEntity)
    private readonly instancesRepository: Repository<InstanceEntity>,
    private readonly usersService: UsersService
  ) {}

  onModuleInit() {
    this.initInstance();
    this.initInstanceWatcher();
  }

  async initInstance() {
    this.createInstance();

    interval(ms('5s')).subscribe(async () => {
      await this.instancesRepository.create({
        id: this.config.get('base.instanceId')
      });
      await this.instancesRepository.update(
        { id: this.config.get('base.instanceId') },
        {}
      );
    });
  }

  async initInstanceWatcher() {
    interval(ms('10s')).subscribe(async () => {
      const instances = await this.instancesRepository.find({
        where: {
          updatedAt: LessThan(new Date(new Date().getTime() - ms('10s')))
        }
      });

      instances.forEach(instance => this.killInstance(instance));
    });
  }

  async killInstance(instance) {
    this.connectionsRepository.delete({ instanceId: instance.id });
    await this.instancesRepository.remove(instance);
  }

  async createInstance() {
    const newInstance = new InstanceEntity();
    newInstance.id = this.config.get('base.instanceId');
    await this.instancesRepository.save(newInstance);
  }

  async findOne(findOptions?: FindOneOptions<ConnectionEntity>) {
    return this.connectionsRepository.findOne(findOptions);
  }

  async find(findOptions?: FindManyOptions<ConnectionEntity>) {
    return this.connectionsRepository.find(findOptions);
  }

  async findUserOnline() {
    const delay = '10s';

    const query = await this.connectionsRepository.query(`
      SELECT
        DISTINCT "userId", "createdAt"
      FROM "connection"
      WHERE "userId" IS NOT NULL
      AND
	    "createdAt" < NOW() - interval '${delay}'
    `);

    return uniqBy(query, (r: any) => r.userId);
  }

  async countIP() {
    const countQuery = await this.connectionsRepository
      .query(`SELECT COUNT(DISTINCT ip) FROM "connection"
    `);

    return countQuery.length > 0 ? countQuery[0].count : 0;
  }

  async countUsers() {
    const countQuery = await this.connectionsRepository.query(`
        SELECT
          COUNT(DISTINCT "userId")
        FROM "connection"
        WHERE "userId" IS NOT NULL
    `);

    return countQuery.length > 0 ? countQuery[0].count : 0;
  }

  async count(findOptions?: FindManyOptions<ConnectionEntity>) {
    return this.connectionsRepository.count(findOptions);
  }

  async create(connectionPayload) {
    const newConnection = new ConnectionEntity();
    newConnection.ip = connectionPayload.ip;
    newConnection.userId = connectionPayload.userId;
    newConnection.instanceId = this.config.get('base.instanceId');

    if (connectionPayload.userId) {
      this.usersService.update(
        { id: connectionPayload.userId },
        {
          lastIP: connectionPayload.ip
        }
      );
    }

    return this.connectionsRepository.save(newConnection);
  }

  async updateById(id: string, data) {
    return this.connectionsRepository.update(id, data);
  }

  async remove(id: string) {
    const connection = await this.findOne({ where: { id } });

    if (!connection) {
      return;
    }

    return this.connectionsRepository.remove(connection);
  }
}
