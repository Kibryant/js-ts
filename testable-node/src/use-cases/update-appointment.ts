import { Appointment } from '../entities/appointment';
import { UseCase } from '../shared/use-case';
import Result from '../shared/result';

interface UpdateAppointmentInput {
    appointmentId: string;
    customerId: string;
    startsAt: Date;
    endsAt: Date;
}

type UpdateAppointmentOutput = Result<Appointment>;

export class UpdateAppointment implements UseCase<UpdateAppointmentInput, UpdateAppointmentOutput> {
    async execute(input: UpdateAppointmentInput): Promise<UpdateAppointmentOutput> {
        const result = Appointment.update({
            customerId: input.customerId,
            startsAt: input.startsAt,
            endsAt: input.endsAt,
        }, input.appointmentId);

        if (result.isFailure) {
            return Result.fail(result.error as string);
        }

        return Result.ok(result.value);
    }
}