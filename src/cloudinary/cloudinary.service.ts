import {
  Injectable,
  BadRequestException,
  PayloadTooLargeException,
} from '@nestjs/common';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(base64Img: string) {
    /* Check file size -> 5mb limit */
    // if (fileObj.file.size > 5e6) {
    //   throw new PayloadTooLargeException('File size exceeds the limit of 5mb');
    // }

    /* Upload -> cloudinary repo */
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
