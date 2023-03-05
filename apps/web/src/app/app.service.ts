import { IPInfo } from '@max-mind/core/models';
import { fetchIPAddresses } from './api';
import { getCachedIPsData, setCachedIPsData, sortBasedOnArray } from './utils';

interface AppService {
    getIPAddressesInfo(ipAddresses: string[]): Promise<IPInfo[]>;
}

// Define the public functions of the app service
export const appService: AppService = {
    /**
     * Returns information about the specified IP addresses.
     * Get information for each IP address from the cache if it exists.
     * If an IP address is not cached, retrieve its information from the remote service
     *
     * @param ipAddresses - An array of IP addresses for which to retrieve information.
     */
    async getIPAddressesInfo(ipAddresses: string[]): Promise<IPInfo[]> {
        const { cachedIPs, nonCachedIPs } = getCachedIPsData(ipAddresses);

        if (!nonCachedIPs.length) {
            return sortBasedOnArray(cachedIPs, ipAddresses);
        }

        try {
            const data = await fetchIPAddresses(nonCachedIPs);
            setCachedIPsData(data);

            const result = data.concat(cachedIPs);

            return sortBasedOnArray(result, ipAddresses);
        } catch (err) {
            throw new Error(`Oops, something went wrong! 
         We're sorry, but there was an error processing your request.
        Please try again later or contact support if the problem persists.`);
        }
    }
};
