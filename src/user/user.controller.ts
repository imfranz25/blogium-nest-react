import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserPasswordDto } from './dto/update-password.to';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Req() request: any,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = request?.user?.id;

    /* Logged in user must match the user id to be updated */
    if (userId !== id) {
      throw new UnauthorizedException(
        'You are not allowed to edit this profile',
      );
    }

    return this.userService.update(id, updateUserDto);
  }

  @Patch('password/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updatePassword(
    @Req() request: any,
    @Param('id') id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const userId = request?.user?.id;

    /* Logged in user must match the user id to be updated */
    if (userId !== id) {
      throw new UnauthorizedException(
        'You are not allowed to edit this profile',
      );
    }

    return this.userService.updatePassword(id, updateUserPasswordDto);
  }
}
