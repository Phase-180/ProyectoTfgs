import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bc from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    try {
      const { password: userPassword, ...user } = await this.findOne(email);
      if (!bc.compareSync(password, userPassword))
        throw new UnauthorizedException();
      const payload = { id: user.id, role: user.role };
      return {
        token: await this.jwtService.signAsync(payload),
        user,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async renewToken(id: number) {
    try {
      const { password, ...user } = await this.findOne(id.toString());
      const payload = { id: user.id, role: user.role };
      return {
        token: await this.jwtService.signAsync(payload),
        user,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async findOne(data: string) {
    try {
      let user = await this.prisma.user.findUnique({ where: { email: data } });
      if (!user)
        user = await this.prisma.user.findUnique({ where: { id: +data } });
      if (!user) throw new BadRequestException('User not found');
      return user;
    } catch (error) {
      throw error;
    }
  }

  // async register(user: CreateLoginDto) {
  //   return await this.prisma.user.create({
  //     data: { ...user, bornDate: new Date(user.bornDate), role: 'ADMIN' },
  //   });
  // }
  async register(user: CreateLoginDto) {
    try {
      const { password, ...rest } = await this.prisma.user.create({
        data: {
          ...user,
          password: bc.hashSync(user.password, bc.genSaltSync(10)),
          bornDate: new Date(user.bornDate),
        },
      });
      return rest;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    return (await this.prisma.user.findMany({})).map(
      ({ password, ...rest }) => rest,
    );
  }

  forgetPassword() {
    return 'forgetPassword';
  }
}
