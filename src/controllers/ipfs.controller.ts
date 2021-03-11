import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { Controller, Get, HttpStatus, UseGuards, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IpfsService } from '@app/services';

// @ApiBearerAuth()
@Controller('ipfs')
// @UseGuards(JwtAuthGuard)
@ApiTags('ipfs')
export class IpfsController {
  // add ipfs service
  constructor(private ipfsService: IpfsService) {}
  @Get()
  @ApiOperation({ summary: 'Create file to IPFS', operationId: 'createIPFSFile' })
  async ipfs() {
    return this.ipfsService.get();
  }
}
