import { SMSService } from "../../domain/services/SMSService";

export class MessageMediaService implements SMSService {
    async sendSMS(phone: string, message: string): Promise<void> {
        console.log(`Sending SMS to ${phone} with message: ${message}`);
    }
}