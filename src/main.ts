import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('api.port');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'stackpath.bootstrapcdn.com'],
        imgSrc: ["'self'", 'data:'],
        fontSrc: ["'self'"],
        connectSrc: ["'self'"],
      },
    }),
  );
  app.use(
    helmet.hsts({
      maxAge: 31536000, // 1 ano em segundos
      includeSubDomains: true,
      preload: true,
    }),
  );
  app.use(helmet.xContentTypeOptions());
  app.use(helmet.xFrameOptions({ action: 'deny' }));
  app.use(helmet.xssFilter());
  app.use(helmet.hidePoweredBy());

  await app.listen(port);
}
bootstrap();
