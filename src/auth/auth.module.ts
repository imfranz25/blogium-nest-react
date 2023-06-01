import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';

import { Provider } from '../../constants';

export const JWT_SECRET = process.env.JWT_SECRET || '';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1hr' }, // e.g. 30s, 7d, 24h
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    { provide: Provider.AUTH_SERVICE, useClass: AuthService },
    { provide: Provider.PRISMA_SERVICE, useClass: PrismaService },
    // { provide: Provider.JWT_STRATEGY, useClass: JwtStrategy },
    JwtStrategy,
  ],
})
export class AuthModule {}
