import Entity from "../shared/entity";
import Result from "../shared/result";

export interface AppointmentProps {
    customerId: string;
    startsAt: Date;
    endsAt: Date;
}

export class Appointment extends Entity{
    private _customerId: string;
    private _startsAt: Date;
    private _endsAt: Date;

    private constructor(props: AppointmentProps, id?: string) {
        super(id);
        
        this._customerId = props.customerId;
        this._startsAt = props.startsAt;
        this._endsAt = props.endsAt;
    }

    public static create(props: AppointmentProps, id?: string): Result<Appointment> {
        if (props.startsAt >= props.endsAt) {
            return Result.fail('The appointment cannot end before it starts');
        }

        if (props.startsAt < new Date()) {
            return Result.fail('The appointment cannot start in the past');
        }

        return Result.ok(new Appointment(props, id));

    }

    public static update(props: AppointmentProps, id: string): Result<Appointment> {
        if (props.startsAt && props.endsAt && props.startsAt >= props.endsAt) {
            return Result.fail('The appointment cannot end before it starts');
        }

        if (props.startsAt && props.startsAt < new Date()) {
            return Result.fail('The appointment cannot start in the past');
        }

        return Result.ok(new Appointment(props, id));
    }

    get customerId() {
        return this._customerId;
    }

    get startsAt() {
        return this._startsAt;
    }

    get endsAt() {
        return this._endsAt;
    }
}