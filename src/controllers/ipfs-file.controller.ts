import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IpfsService } from '@app/modules/ipfs.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('upload')
@ApiTags('ipfs-file-upload')
export class IpfsFileController {
  // add ipfs service
  constructor(private ipfsService: IpfsService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload File to IPFS', operationId: 'createFile' })
  async upload(@UploadedFile() data: Express.Multer.File) {
    const client = await this.ipfsService.getClient();

    const file = await client.add(data.buffer);

    return { file };
  }
}
