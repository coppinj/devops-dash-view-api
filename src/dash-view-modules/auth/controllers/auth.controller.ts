import { AuthService, LoginDTO } from '@dash-view-core';
import { Body, Controller, Post } from '@nestjs/common';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Post('login')
  async loginAction(@Body() dto: LoginDTO): Promise<any> {
    return this.authService.login(dto);
  }
}
