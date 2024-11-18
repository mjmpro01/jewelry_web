import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaymentService } from './payment.service';
import { CreatePaymentURL } from './payment-input';

@ApiTags('payments')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment')
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createPayment(@Body() body: CreatePaymentURL) {
    return this.paymentService.createPaymentUrl(body.order_code);
  }
  @Get('vnpay-return')
  async vnpayReturn(@Query() query: any,  @Res() res: Response) {
    const result = await this.paymentService.vnpayReturn(query);
    return res.redirect(result.redirectUrl);
  }
}
 