import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { GeoipService } from './geoip.service';
import { LookupDto } from './dto/lookup.dto';
import { IPInfo } from '@ip-lookup/core/models';

@Controller('lookup')
export class AppController {
  constructor(private readonly geoipService: GeoipService) { }

  @Post()
  @ApiOperation({
    summary: "Perform a geo-ip lookup based on IP address",
    description: `Given an IP address or range of IP addresses, this endpoint will use a geo-ip service to determine the corresponding location.
     The result will include information such as the countryCode, postalCode, cityName, timeZone, and accuracyRadius.`,
  })
  async lookup(@Body() body: LookupDto): Promise<IPInfo[]> {
    return await this.geoipService.lookupIPAddresses(body);
  }
}
