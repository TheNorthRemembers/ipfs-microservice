import { Controller, Post, Body } from '@nestjs/common';
import { IpfsService } from '@app/modules/ipfs.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTokenUriDto } from '@app/dto';

// @ApiBearerAuth()
@Controller('tokenuri')
// @UseGuards(JwtAuthGuard)
@ApiTags('ipfs-tokenuri')
export class IpfsController {
  // add ipfs service
  constructor(private ipfsService: IpfsService) {}
  @Post()
  @ApiOperation({ summary: 'Create file to IPFS', operationId: 'createIPFSFile' })
  async tokenuri(@Body() body: CreateTokenUriDto) {
    const client = await this.ipfsService.getClient();

    const data = JSON.stringify(body);

    const file = await client.add(data);

    return { file };
  }
}
