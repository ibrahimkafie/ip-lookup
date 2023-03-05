
/**
 * Represents information about an IP address.
 */
export interface IPInfo {
    /**
     * The IP address.
     */
    ip: string;

    /**
     * IP invalid error message.
     */
    error?: string;

    /**
     * IP info.
     * @example [["Country Code", "US"], ["Postal Code", "N2K"]]
     */
    info?: [string, string | undefined][];
}