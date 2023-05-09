import { IPInfo } from "@ip-lookup/core/models";

/**
 * Sets the given IP(s) information in sessionStorage.
 *
 * @param ipItems An array of IPInfo objects to cache in sessionStorage.
 */
export function setCachedIPsData(ipItems: IPInfo[]): void {
    ipItems.forEach((item: IPInfo) => {
        sessionStorage.setItem(item.ip, JSON.stringify(item));
    });
}
