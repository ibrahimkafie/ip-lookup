import { IPInfo } from '@ip-lookup/core/models';
import { fetchIPsAddresses } from '../api';
import { getCachedIPsData, setCachedIPsData } from '../utils';

interface LookupService {
    getIPAddressesInfo(ipAddresses: string[]): Promise<IPInfo[]>;
}

export const lookupService: LookupService = {
    /**
     * Returns information about the specified IP addresses.
     * Get information for each IP address from the cache if it exists.
     * If an IP address is not cached, retrieve its information from the remote service.
     *
     * @param ipAddresses - An array of IP addresses for which to retrieve information.
     */
    async getIPAddressesInfo(ipAddresses: string[]): Promise<IPInfo[]> {
        const { cachedIPs, nonCachedIPs } = getCachedIPsData(ipAddresses);

        if (!nonCachedIPs.length) {
            return cachedIPs;
        }

        try {
            // Fetch IPs list data from the server
            const data = await fetchIPsAddresses(nonCachedIPs);

            // Cache the new IP list data
            setCachedIPsData(data);

            // Invoke itself to retrieve all cached data and sort it based on the main IP list.
            return this.getIPAddressesInfo(ipAddresses);
        } catch (err) {

            throw new Error(`Oops, something went wrong! 
         We're sorry, but there was an error processing your request.
        Please try again later or contact support if the problem persists.`);

        }
    }
};
