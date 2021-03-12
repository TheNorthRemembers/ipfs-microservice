import { Controller, Post, Body } from '@nestjs/common';
import { IpfsService } from '@app/modules/ipfs.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTokenUriDto } from '@app/dto';

@Controller('tokenuri')
@ApiTags('ipfs-tokenuri')
export class IpfsTokenuriController {
  // add ipfs service
  constructor(private ipfsService: IpfsService) {}
  @Post()
  @ApiOperation({ summary: 'Create TokenUri File and Upload to IPFS', operationId: 'createTokenUriFile' })
  async tokenuri(@Body() body: CreateTokenUriDto) {
    const client = await this.ipfsService.getClient();

    const data = JSON.stringify(body);

    const file = await client.add(data);

    return { file };
  }
}
