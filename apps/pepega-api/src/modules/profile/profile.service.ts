import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly userSocialRepository: Repository<Profile>,
  ) {}

  async findOne(findOptions?: FindOneOptions<Profile>) {
    return this.userSocialRepository.findOne(findOptions);
  }

  async find(findOptions?: FindManyOptions<Profile>) {
    return this.userSocialRepository.find(findOptions);
  }

  async count(findOptions?: FindManyOptions<Profile>) {
    return this.userSocialRepository.count(findOptions);
  }

  async create(userSocialPayload) {
    const duplicateSocialUser = await this.findOne({
      where: {
        serviceName: userSocialPayload.serviceName,
        serviceId: userSocialPayload.serviceId,
      },
    });

    if (duplicateSocialUser) {
      throw new Error('Duplicate Social User');
    }

    const newSocialUser = new Profile();

    Object.keys(userSocialPayload).forEach(field => {
      newSocialUser[field] = userSocialPayload[field];
    });

    return this.userSocialRepository.save(newSocialUser);
  }

  async updateById(id: string, data) {
    return this.userSocialRepository.update(id, data);
  }

  async update(where, data) {
    return this.userSocialRepository.update(where, data);
  }

  async remove(findOptions?: FindOneOptions<Profile>) {
    const userSocial = await this.findOne(findOptions);

    if (!userSocial) {
      throw new Error(`Profile not found`);
    }

    return this.userSocialRepository.remove(userSocial);
  }
}
