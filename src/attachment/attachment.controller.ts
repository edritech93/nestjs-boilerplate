import {
  BadRequestException,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Get,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/libs/get-multer-options';
import { AttachmentService } from './attachment.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { GetUser } from 'src/libs/get-user.decorator';
import { JwtGuard } from 'src/user-auth/libs/jwt.guard';
import { UserAuth } from 'src/user-auth/entities/user-auth.entity';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('v1/attachment')
@UseGuards(JwtGuard)
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @GetUser() user: UserAuth,
  ) {
    try {
      if (!files && files.length === 0) {
        throw { message: 'File not found' };
      }
      const data = [];
      for (let i = 0; i < files.length; i++) {
        const item = files[i];
        const body: CreateAttachmentDto = {
          fileName: item.filename,
          type: item.mimetype,
          path: item.path,
          userId: user.id,
        };
        const temp = await this.attachmentService.create(body);
        data.push(temp);
      }
      return {
        data,
        message: 'Upload File Successfully',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const dataExist = await this.attachmentService.findOne(+id);
      if (!dataExist) {
        throw { message: 'Attachment not found' };
      }
      const file = createReadStream(join(process.cwd(), dataExist.path));
      return new StreamableFile(file);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
