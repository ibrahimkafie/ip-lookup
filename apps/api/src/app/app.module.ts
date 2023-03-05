import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { GeoipService } from './geoip.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [GeoipService],
})
export class AppModule { }
