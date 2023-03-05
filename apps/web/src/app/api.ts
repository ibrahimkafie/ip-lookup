import { IPInfo } from "@max-mind/core/models";

export const fetchIPAddresses = async (body: string[]): Promise<IPInfo[]> => {
    const response = await fetch('/api/lookup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ipAddresses: body }),
    });
    return await response.json();
}