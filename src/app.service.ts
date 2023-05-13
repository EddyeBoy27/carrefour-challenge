import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UsersService) {}

  async getHello(): Promise<string> {
    const users = await this.userService.findAll();
    console.log(users);
    return 'Hello World!';
  }
}
