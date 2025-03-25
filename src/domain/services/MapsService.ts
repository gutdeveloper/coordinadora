export interface MapsService {
    validateAddress(address: string): Promise<boolean>;
}