import Entity from "../shared/entity";

export interface CustomerProps {
    name: string;
    email: string;
}

export class Customer extends Entity {
    private _name: string;
    private _email: string;

    private constructor(private props: CustomerProps, id?: string) {
        super(id);

        this._name = props.name;
        this._email = props.email;
    }

    public static create(props: CustomerProps, id?: string): Customer {
        return new Customer(props, id);
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }
}