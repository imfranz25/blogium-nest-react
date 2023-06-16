import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';

export const JWT_SECRET = process.env.JWT_SECRET || '';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    PrismaModule,
    CloudinaryModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1hr' }, // e.g. 30s, 7d, 24h
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
