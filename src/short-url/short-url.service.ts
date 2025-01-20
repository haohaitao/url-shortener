import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortUrl } from './entities/short-url.entity';
import * as crypto from 'crypto';

@Injectable()
export class ShortUrlService {
  constructor(
    @InjectRepository(ShortUrl)
    private shortUrlRepository: Repository<ShortUrl>,
  ) {}

  async findByUrl(url: string): Promise<ShortUrl | undefined> {
    return this.shortUrlRepository.findOne({ where: { url, softDelete: false } });
  }

  async create(url: string): Promise<ShortUrl> {
    if (!url) {
      throw new HttpException({ message: '请输入正确的url' }, HttpStatus.BAD_REQUEST);
    }
    const shortCode = this.generateShortCode();
    const shortUrl = this.shortUrlRepository.create({
      url,
      shortCode,
      softDelete: false,
    });
    return this.shortUrlRepository.save(shortUrl);
  }

  async findByShortCode(shortCode: string): Promise<ShortUrl | undefined> {
    return this.shortUrlRepository.findOneBy({ shortCode, softDelete: false });
  }

  private generateShortCode(): string {
    return crypto.randomBytes(3).toString('hex');
  }

  async softDeleteAll(): Promise<void> {
    await this.shortUrlRepository.update({}, { softDelete: true });
  }
}
