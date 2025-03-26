import { MapsService } from "../../domain/services/MapsService";
import { Client } from "@googlemaps/google-maps-services-js";

export class GoogleMapsService implements MapsService {
    private client = new Client();
    private API_KEY = process.env.GOOGLE_MAPS_API_KEY;

    async validateAddress(address: string): Promise<boolean> {
        try {
            const response = await this.client.geocode({
                params: {
                    address: address,
                    key: String(this.API_KEY),
                    components: { country: "CO" },
                },
            });
            if (response.data.status === "OK" && response.data.results.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error validating address:", error);
            return false;
        }
    }
}