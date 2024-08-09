import MailProvider, { Message } from "../domain/providers/mail/mail-provider";

interface TransporterProps {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
}

class Transporter {
    private readonly _host: string;
    private readonly _port: number;
    private readonly _secure: boolean;
    private readonly _auth: {
        user: string;
        pass: string;
    };

    constructor({ host, port, secure, auth }: TransporterProps) {
        this._host = host;
        this._port = port;
        this._secure = secure;
        this._auth = auth;
    }

    sendMail(message: Message): void {
        console.log("Sending mail: ", message);
    }

    get host(): string {
        return this._host;
    }

    get port(): number {
        return this._port;
    }

    get secure(): boolean {
        return this._secure;
    }

    get auth(): {
        user: string;
        pass: string;
    } {
        return this._auth;
    }

    equals(other: Transporter): boolean {
        return (
            this.host === other.host &&
            this.port === other.port &&
            this.secure === other.secure &&
            this.auth.user === other.auth.user &&
            this.auth.pass === other.auth.pass
        );
    }
}

export class MailProviderMock implements MailProvider {
    private fakeTransporter: Transporter;

    constructor() {
        this.fakeTransporter = new Transporter({
            host: "smtp.example.com",
            port: 465,
            secure: true,
            auth: {
                user: "fakeuser",
                pass: "fakepassword"
            }
        });
    }

    async sendMail(message: Message): Promise<void> {
        this.fakeTransporter.sendMail(message);
    }
}