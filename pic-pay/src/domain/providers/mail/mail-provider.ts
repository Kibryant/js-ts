interface Address {
    address: string;
    name: string;
}

export interface Message {
    to: Address;
    from: Address;
    subject: string;
    body: string;
}

export default abstract class MailProvider {
    abstract sendMail(message: Message): Promise<void>;
}