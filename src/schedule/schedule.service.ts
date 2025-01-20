import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ShortUrlService } from '../short-url/short-url.service';
import * as crypto from 'crypto';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private readonly shortUrlService: ShortUrlService) {
    this.logger.debug(
      `crypto module available: ${typeof crypto.randomUUID === 'function'}`,
    );
  }

  @Cron('0 0 * * 1') // 每周一晚（24点）执行
  async handleCron() {
    const name = crypto.randomUUID(); // 使用 crypto.randomUUID()
    this.logger.debug(`开始软删除所有短链... [任务名称: ${name}]`);
    await this.shortUrlService.softDeleteAll();
    this.logger.debug('所有短链已软删除');
  }
}
