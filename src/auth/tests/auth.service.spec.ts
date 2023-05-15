import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('jwt-token'),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn().mockReturnValue({
              email: 'test@example.com',
              password:
                '$2b$10$2SYbZqh..JlL1nCZuSLdXuWkI9Bu0Jbq5N02M0x9I7cYZe0fb.3X6',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user if email and password are valid', async () => {
      const compareMock = jest
        .spyOn(bcrypt, 'compare')
        .mockReturnValueOnce(true as any);

      const user = await service.validateUser('test@example.com', 'password');

      expect(user).toEqual({
        email: 'test@example.com',
        password:
          '$2b$10$2SYbZqh..JlL1nCZuSLdXuWkI9Bu0Jbq5N02M0x9I7cYZe0fb.3X6',
      });
      expect(compareMock).toHaveBeenCalledWith(
        'password',
        '$2b$10$2SYbZqh..JlL1nCZuSLdXuWkI9Bu0Jbq5N02M0x9I7cYZe0fb.3X6',
      );
    });

    it('should return null if email or password is invalid', async () => {
      const compareMock = jest
        .spyOn(bcrypt, 'compare')
        .mockReturnValueOnce(false as any);

      const user = await service.validateUser('test@example.com', 'password');

      expect(user).toBeNull();
      expect(compareMock).toHaveBeenCalledWith('password', expect.any(String));
    });
  });

  describe('login', () => {
    it('should return JWT token if user is provided', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'testepassword',
      };
      const signMock = jest.spyOn(jwtService, 'sign');

      const token = await service.login(user as any);


      expect(token).toBe('jwt-token');
      expect(signMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        userId: 1,
      });
    });

    it('should throw UnauthorizedException if user is not provided', async () => {
      const user = null;
      await expect(service.login(user)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
