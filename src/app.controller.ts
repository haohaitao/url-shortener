// app.controller.ts
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index') // 渲染 index.ejs 模板
  getIndex() {
    return {}; // 可以传递数据到模板
  }
}
