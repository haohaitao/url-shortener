import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // 导入 NestExpressApplication
import { join } from 'path';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from './filters/http-exception.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // 使用 NestExpressApplication
  app.useStaticAssets(join(__dirname, '..', 'views')); // 设置静态文件目录
  app.setBaseViewsDir('views'); // 设置视图目录
  app.setViewEngine('ejs'); // 设置模板引擎为 EJS
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.PORT ?? 3003;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
