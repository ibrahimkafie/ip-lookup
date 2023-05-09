import { IPInfo } from "@ip-lookup/core/models";

/**
 * Fetch IPs addresses
 * @param body - An array of IP addresses for which to retrieve information.
 */
export const fetchIPsAddresses = async (body: string[]): Promise<IPInfo[]> => {
    const response = await fetch('/api/lookup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ipAddresses: body }),
    });
    return await response.json();
}