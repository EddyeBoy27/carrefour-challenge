import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../../users/entity/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('postgresql.host'),
      port: this.configService.get<number>('postgresql.port'),
      database: this.configService.get<string>('postgresql.database'),
      username: this.configService.get<string>('postgresql.user'),
      password: this.configService.get<string>('postgresql.password'),
      entities: [User],
      logging: true,
      synchronize: false, // never use TRUE in production!
      extra: {
        searchPath: 'cashflow,public',
      },
    };
  }
}
