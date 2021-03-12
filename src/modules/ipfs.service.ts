import { Injectable, Inject } from '@nestjs/common';
import { IPFS_MODULE_OPTIONS } from './ipfs.constants';
import { IPFSModuleOptions } from './interfaces';

let createClient;

const { IPFS_URL } = process.env;

@Injectable()
export class IpfsService {
  // DEBUG: Give IPFS Node a type when implemented
  private _ipfsClient: any;

  constructor(@Inject(IPFS_MODULE_OPTIONS) private _ipfsOptions: IPFSModuleOptions) {}

  async getClient(): Promise<any> {
    if (!createClient) {
      createClient = require('ipfs-http-client');
    }
    return this._ipfsClient ? this._ipfsClient : (this._ipfsClient = createClient(IPFS_URL));
  }
}
