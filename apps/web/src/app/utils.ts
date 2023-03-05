import { IPInfo } from "@max-mind/core/models";

/**
 * Retrieves cached IP(s) information from sessionStorage and separates it from the non-cached IPs.
 * 
 * @param ipAddresses An array of IP addresses to look up in sessionStorage.
 * @returns An object containing an array of cached IP information and an array of non-cached IP addresses.
 */
export function getCachedIPsData(ipAddresses: string[]) {
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

    return { cachedIPs, nonCachedIPs };
}

/**
 * Sets the given IP(s) information in sessionStorage.
 *
 * @param ipItems An array of IPInfo objects to cache in sessionStorage.
 */
export function setCachedIPsData(ipItems: IPInfo[]) {
    ipItems.forEach((item: IPInfo) => {
        sessionStorage.setItem(item.ip, JSON.stringify(item));
    });
}

/**
 * Sorts an array of IPInfo objects based on the order of IP addresses in another array.
 *
 * @param targetArray An array of IPInfo objects to sort.
 * @param sortByArray An array of IP addresses to use for sorting the targetArray.
 * @returns A sorted array of IPInfo objects.
 */
export function sortBasedOnArray(targetArray: IPInfo[], sortByArray: string[]) {
    return targetArray.sort((a, b) => {
        return sortByArray.indexOf(a.ip) - sortByArray.indexOf(b.ip);
    })
}