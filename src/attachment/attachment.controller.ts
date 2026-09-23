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
  InternalServerErrorException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../libs/get-multer-options';
import { AttachmentService } from './attachment.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { GetUser } from '../libs/get-user.decorator';
import { JwtGuard } from '../user-auth/libs/jwt.guard';
import { UserAuth } from '../user-auth/entities/user-auth.entity';
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
      if (!files) {
        throw new BadRequestException('File not found');
      }
      const data: CreateAttachmentDto[] = [];
      for (let i = 0; i < files.length; i++) {
        const item = files[i];
        const body: CreateAttachmentDto = {
          fileName: item.filename,
          type: item.mimetype,
          path: item.path,
          userId: user.id,
        };
        const temp: CreateAttachmentDto =
          await this.attachmentService.create(body);
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
        throw new BadRequestException('Attachment not found');
      }
      const file = createReadStream(join(process.cwd(), dataExist.path));
      return new StreamableFile(file);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
