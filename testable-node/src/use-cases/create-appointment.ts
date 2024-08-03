import { Appointment } from '../entities/appointment';
import Result from '../shared/result';
import { UseCase } from '../shared/use-case';

interface CreateAppointmentInput {
    customerId: string;
    startsAt: Date;
    endsAt: Date;
}

type CreateAppointmentOutput = Result<Appointment>;

export class CreateAppointment implements UseCase<CreateAppointmentInput, CreateAppointmentOutput> {
    async execute(input: CreateAppointmentInput): Promise<CreateAppointmentOutput> {
        const result = Appointment.create({
            customerId: input.customerId,
            startsAt: input.startsAt,
            endsAt: input.endsAt,
        });

        if (result.isFailure) {
            return Result.fail(result.error as string);
        }

        return Result.ok(result.value);
    }
}