import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from '../typeorm.service';
import { User } from '../../../users/entities/user.entity';
import { Transaction } from '../../../transactions/entities/transaction.entity';

describe('TypeOrmConfigService', () => {
  let service: TypeOrmConfigService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TypeOrmConfigService>(TypeOrmConfigService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('createTypeOrmOptions', () => {
    it('should return the TypeORM options', () => {
      const host = 'localhost';
      const port = 5432;
      const database = 'testdb';
      const username = 'testuser';
      const password = 'testpassword';

      jest.spyOn(configService, 'get').mockImplementation((key: string) => {
        switch (key) {
          case 'postgresql.host':
            return host;
          case 'postgresql.port':
            return port;
          case 'postgresql.database':
            return database;
          case 'postgresql.user':
            return username;
          case 'postgresql.password':
            return password;
          default:
            return undefined;
        }
      });

      const options = service.createTypeOrmOptions() as {
        type;
        host;
        port;
        database;
        username;
        password;
        entities;
        logging;
        synchronize;
        extra;
      };

      expect(options.type).toBe('postgres');
      expect(options.host).toBe(host);
      expect(options.port).toBe(port);
      expect(options.database).toBe(database);
      expect(options.username).toBe(username);
      expect(options.password).toBe(password);
      expect(options.entities).toEqual(
        expect.arrayContaining([User, Transaction]),
      );
      expect(options.logging).toBe(true);
      expect(options.synchronize).toBe(false);
      expect(options.extra).toEqual({ searchPath: 'cashflow,public' });
    });
  });
});
