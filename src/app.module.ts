// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ShortUrlModule } from './short-url/short-url.module';
import { ScheduleService } from './schedule/schedule.service';
import { AppController } from './app.controller'; // 导入 AppController
import { AppService } from './app.service'; // 导入 AppService

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'short-urls.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    ShortUrlModule,
  ],
  controllers: [AppController], // 添加 AppController 到 controllers 数组
  providers: [AppService, ScheduleService], // 添加 AppService 到 providers 数组
})
export class AppModule {
  static forRoot() {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // 添加默认值
    process.env.BASE_URL = baseUrl; // 设置环境变量
    return AppModule;
  }
}
