import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, FindOneOptions } from 'typeorm';
import { RKInvoice } from './rkinvoice.entity';
import { InvoiceStatus } from './types/InvoiceStatus.enum';

@Injectable()
export class RobokassaService {
  constructor(
    @InjectRepository(RKInvoice)
    private readonly rkInvoiceRepository: Repository<RKInvoice>,
  ) {}

  async create(payload: DeepPartial<RKInvoice>): Promise<RKInvoice> {
    return this.rkInvoiceRepository.save(
      this.rkInvoiceRepository.create(payload),
    );
  }

  async findOne(findOptions: FindOneOptions<RKInvoice>): Promise<RKInvoice> {
    return await this.rkInvoiceRepository.findOne(findOptions);
  }

  async setStatus(id: number, status: InvoiceStatus) {
    const rkInvoice = await this.rkInvoiceRepository.findOneOrFail({
      where: { id },
    });

    rkInvoice.status = status;

    return this.rkInvoiceRepository.save(rkInvoice);
  }

  async income(limit = '30d') {
    const q = await this.rkInvoiceRepository.query(`
      SELECT SUM(sum)
      FROM "rk_invoice"
      WHERE "status" = 'walletdone'
      AND "updatedAt" > NOW() - interval '${limit}'`);

    if (q.length === 0) {
      return 0;
    }

    return q[0].sum ? parseInt(q[0].sum, 10) : 0;
  }
}
