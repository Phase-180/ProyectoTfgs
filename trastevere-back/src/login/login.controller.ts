import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { LoginService } from './login.service';
import { Request, Response } from 'express';
import { ECookies } from 'src/core/enums/Ecookies';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Erequest } from 'src/core/enums/Erequest';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(
    @Body() user: { email: string; password: string },
    @Res() res: Response,
  ) {
    const { token, user: userInt } = await this.loginService.login(
      user.email,
      user.password,
    );
    res.cookie(ECookies.TOKEN, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.json(userInt);
  }

  @Post('register')
  register(@Body() user: CreateLoginDto) {
    return this.loginService.register(user);
  }

  @Post('reset-password')
  forgetPassword() {
    return this.loginService.forgetPassword();
  }

  @UseGuards(AuthGuard)
  @Get('renew-token')
  async renewToken(@Req() req: Request, @Res() res: Response) {
    const { token, user: userInt } = await this.loginService.renewToken(
      req[Erequest.USER_ID],
    );
    res.cookie(ECookies.TOKEN, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.json(userInt);
  }

  @UseGuards(AuthGuard)
  @Get('getAllUsers')
  async allUsers() {
    return this.loginService.getAllUsers();
  }
}
