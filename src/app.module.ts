import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './v1/auth/account/account.module';
import { V1Module } from './v1/v1.module';
import { AssetsModule } from './v1/manage/assets/assets.module';
import { JwtGlobalModule } from './common/jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtGlobalModule,
    AccountModule,
    V1Module,
    AssetsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
