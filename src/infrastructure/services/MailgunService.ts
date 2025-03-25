import { EmailService } from "../../domain/services/emailService";

export class MailgunEmailService implements EmailService {
    constructor() {
    }
    async sendEmailActivation(email: string, name: string): Promise<void> {
        console.log(`Sending email activation to ${email} with name ${name}`);
    }
}