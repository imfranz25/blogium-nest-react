import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';

export const JWT_SECRET = process.env.JWT_SECRET || 'stratpoint';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1hr' }, // e.g. 30s, 7d, 24h
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}