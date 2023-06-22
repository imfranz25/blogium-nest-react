import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(base64Img: string) {
    try {
      return await v2.uploader.upload(base64Img, {
        use_filename: false,
        unique_filename: true,
        overwrite: false,
        resource_type: 'image',
      });
    } catch (error) {
      console.log(error);

      throw new BadRequestException(
        'Something went wrong when uploading the file, please try again later',
      );
    }
  }
}
