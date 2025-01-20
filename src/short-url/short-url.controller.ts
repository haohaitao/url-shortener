// src/short-url/short-url.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { Response } from 'express';

@Controller('short-url')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Post('create')
  async createShortUrl(@Body() body: any, @Res() res: Response) {
    try {
      const { url } = body;
      const shortUrl = await this.shortUrlService.create(url);
      res.status(HttpStatus.CREATED).json({
        shortUrl: `${process.env.BASE_URL}/short-url/${shortUrl.shortCode}`,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
  }

  @Get(':shortCode')
  async handleShortUrl(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
  ) {
    try {
      const shortUrl = await this.shortUrlService.findByShortCode(shortCode);
      if (!shortUrl) {
        throw new HttpException(
          { message: '短链不存在' },
          HttpStatus.NOT_FOUND,
        );
      }
      if (shortUrl.url) {
        res.redirect(shortUrl.url);
      } else {
        throw new HttpException(
          { message: '短链内容为空' },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
