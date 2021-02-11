import { createHash } from 'crypto';
import { URL } from 'url';
import {
  Controller,
  Post,
  Get,
  Param,
  Request,
  Response,
  Body,
  Logger
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RobokassaService } from './robokassa.service';
import { WalletService } from '../wallet/wallet.service';
import { InvoiceStatus } from './types/InvoiceStatus.enum';
import { InvoiceType } from './types/InvoiceType.enum';
import { CurrencyType } from '../wallet/types/CurrencyType';
import { AuthService } from '../auth/auth.service';

@Controller('robokassa')
export class RobokassaController {
  private password1;
  private password2;

  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
    private readonly robokassaService: RobokassaService,
    private readonly walletService: WalletService
  ) {
    if (config.get('robokassa.isTest')) {
      this.password1 = config.get('robokassa.password1Test');
      this.password2 = config.get('robokassa.password2Test');
    } else {
      this.password1 = config.get('robokassa.password1');
      this.password2 = config.get('robokassa.password2');
    }
  }

  @Get('buy/real/:count')
  async pay(@Request() req, @Response() res, @Param('count') count) {
    const jwtPayload: any = this.authService.jwtValidation(
      req.cookies.accessToken
    );
    const userId = jwtPayload ? jwtPayload.userId : null;

    if (!userId) {
      throw new Error('Deny');
    }

    const amount = parseInt(count, 10);
    const sale = this.config.get('robokassa.realCoinPacks')[amount];

    if (typeof sale !== 'number') {
      throw new Error(`Real coins pack for ${amount} not found`);
    }

    const sum = amount - (amount / 100) * sale;

    let wallet = await this.walletService.findOne({
      where: { currency: CurrencyType.real, userId }
    });

    if (!wallet) {
      wallet = await this.walletService.create({
        userId,
        currency: CurrencyType.real
      });
    }

    // Find or create real wallet for current user
    const rkInvoice = await this.robokassaService.create({
      walletId: wallet.id,
      type: InvoiceType.realcoin,
      amount,
      sum
    });

    const signaturePayload = `${this.config.get('robokassa.login')}:${sum}:${
      rkInvoice.id
    }:${this.password1}`;

    const signature = createHash(this.config.get('robokassa.hashMethod'))
      .update(signaturePayload)
      .digest('hex');

    const url = new URL(this.config.get('robokassa.authUrl'));

    url.searchParams.set('MerchantLogin', this.config.get('robokassa.login'));
    url.searchParams.set('InvId', rkInvoice.id.toString());
    url.searchParams.set(
      'Description',
      this.config.get('robokassa.description')
    );
    url.searchParams.set('Culture', this.config.get('robokassa.culture'));
    url.searchParams.set('Encoding', this.config.get('robokassa.encoding'));
    url.searchParams.set('OutSum', sum.toString());
    url.searchParams.set('SignatureValue', signature);

    if (this.config.get('robokassa.isTest')) {
      url.searchParams.set('IsTest', '1');
    }

    res.redirect(url.toString());
  }

  @Post('result')
  async result(@Body() body, @Response() res) {
    const { InvId, OutSum, SignatureValue } = body;

    const SIGNATURE_PAYLOAD = `${body.OutSum}:${body.InvId}:${this.password2}`;

    const SIGNATURE = createHash(this.config.get('robokassa.hashMethod'))
      .update(SIGNATURE_PAYLOAD)
      .digest('hex')
      .toUpperCase();

    if (SIGNATURE !== SignatureValue) {
      Logger.error(`Invalid Robokassa Result Signature ${InvId} ${OutSum}`);
      return res.redirect(this.config.get('base.baseURL'));
    }

    const rkInvoice = await this.robokassaService.findOne({
      where: { id: InvId }
    });

    if (!rkInvoice) {
      Logger.error(`${InvId} not found`, 'RobokassaController');
      return;
    }

    if (rkInvoice.status !== InvoiceStatus.paywait) {
      Logger.error(
        `${rkInvoice.id} incorrect status ${rkInvoice.status}`,
        'RobokassaController'
      );
      return;
    }

    // Update Robokassa Invoice Data
    await this.robokassaService.setStatus(InvId, InvoiceStatus.paydone);

    try {
      Logger.log(`${rkInvoice.walletId} - ${rkInvoice.amount}`, 'Robokassa');

      await this.walletService.incrementBalance({
        walletId: rkInvoice.walletId,
        amount: rkInvoice.amount
      });

      await this.robokassaService.setStatus(InvId, InvoiceStatus.walletdone);
    } catch (error) {
      Logger.error(error, 'RobokassaController');
      await this.robokassaService.setStatus(InvId, InvoiceStatus.walleterror);
    }

    return res.redirect(this.config.get('base.baseURL'));
  }

  @Post('success')
  success(@Response() res) {
    return res.redirect(this.config.get('base.baseURL'));
  }

  @Post('fail')
  fail(@Response() res) {
    return res.redirect(this.config.get('base.baseURL'));
  }
}
