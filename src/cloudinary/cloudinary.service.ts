import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(file): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader
        .upload(file, {
          use_filename: false,
          unique_filename: true,
          overwrite: true,
        })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }
}
