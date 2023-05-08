import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { Reader, ReaderModel } from '@maxmind/geoip2-node';
import path from 'path';
import { LookupDto } from './dto/lookup.dto';
import { IPInfo } from '@ip-lookup/core/models';

// path to the database file
const DB_PATH = path.resolve(__dirname, process.env.DATABASE_PATH ?? '');

@Injectable()
export class GeoipService {
  // Reusing the ReaderModel object rather than creating a new one for each lookup.
  // The creation of this object is relatively expensive as it must read in metadata for the file.
  private _reader!: ReaderModel;

  constructor() {
    this._openDBConnection();
  }

  private _openDBConnection = async () => {
    try {

      // Open city database file asynchronously
      this._reader = await Reader.open(DB_PATH, { watchForUpdates: true, watchForUpdatesHook: this._openDBConnection }); // for `watchForUpdates` option @see https://github.com/runk/node-maxmind#options

    } catch (err) {

      throw new ServiceUnavailableException('Failed to connect to database',
        { cause: new Error(), description: err.message });

    }
  }

  /**
   * Retrieves detailed information about a list of IP addresses.
   * @param lookupDto - An object containing an array of IP addresses.
   * @returns An array of `IPInfo` objects containing detailed information about the cities associated with each IP address.
   */
  async lookupIPAddresses({ ipAddresses }: LookupDto): Promise<IPInfo[]> {
    try {

      // Return information about each IP address
      return ipAddresses.map(this._getCityInfo);

    } catch (err) {

      throw new BadRequestException('Invalid request data. Please provide a valid IP address or range of IP addresses',
        { cause: new Error(), description: err.message });
    }
  }

  /**
   * Get city db data for an IP address.
   * @param ipAddress The IP Address you want to query the City db with.
   * @returns An object with detailed information about the city associated with a provided IP address.
   */
  private _getCityInfo = (ipAddress: string): IPInfo => {
    try {
      // Query city information for IP address
      const cityInfo = this._reader.city(ipAddress);

      // Extract the relevant information
      const { country, postal, city, location } = cityInfo;

      // Return city information as object
      return {
        ip: ipAddress,
        info: [
          ['Country Code', country?.isoCode],
          ['Postal Code', postal?.code],
          ['City Name', city?.names?.en],
          ['Time Zone', location?.timeZone],
          ['Accuracy Radius', location?.accuracyRadius?.toString()]
        ]
      };

    } catch (err) {

      return {
        ip: ipAddress,
        error: err.message // return invalid ip error message
      };
    }
  }
}
