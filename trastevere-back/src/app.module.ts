import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from './config/env';
import { ReservaModule } from './reserva/reserva.module';
import { TarifaModule } from './tarifa/tarifa.module';
import { PageModule } from './page/page.module';
@Module({
  imports: [
    LoginModule,
    JwtModule.register({
      global: true,
      secret: envs.SECRET,
      signOptions: { expiresIn: envs.EXPIRES_IN },
    }),
    ReservaModule,
    TarifaModule,
    PageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
