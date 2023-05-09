import { IPInfo } from "@ip-lookup/core/models";

export interface IPCacheData {
    cachedIPs: IPInfo[];
    nonCachedIPs: string[];
}

/**
 * Retrieves cached IP(s) information from sessionStorage and separates it from the non-cached IPs.
 * 
 * @param ipAddresses An array of IP addresses to look up in sessionStorage.
 * @returns An object containing an array of cached IP information and an array of non-cached IP addresses.
 */
export function getCachedIPsData(ipAddresses: string[]): IPCacheData {
    const cachedIPs: IPInfo[] = [];
    const nonCachedIPs: string[] = [];

    // Loop through each IP address and check if it's in sessionStorage
    ipAddresses.forEach(ip => {
        const cachedData = sessionStorage.getItem(ip);
        if (cachedData) {
            cachedIPs.push(JSON.parse(cachedData));
        } else {
            nonCachedIPs.push(ip);
        }
    });

    if (!nonCachedIPs.length) {
        // Sorts an array of IPInfo objects based on the order of IP addresses in another array.
        cachedIPs.sort((a, b) => {
            return ipAddresses.indexOf(a.ip) - ipAddresses.indexOf(b.ip);
        });
    }

    return { cachedIPs, nonCachedIPs };
}