import { describe, it, expect } from 'vitest';
import { UpdateAppointment } from './update-appointment';

describe('UpdateAppointment', () => {
    it('updates an appointment', async () => {
        const updateAppointment = new UpdateAppointment();

        const input = {
            appointmentId: 'appointment-id',
            customerId: 'customer-id',
            startsAt: new Date(),
            endsAt: new Date(new Date().setDate(new Date().getDate() + 1)),
        };

        const output = await updateAppointment.execute(input);

        expect(output.value.customerId).toBe(input.customerId);
        expect(output.value.startsAt).toBe(input.startsAt);
        expect(output.value.endsAt).toBe(input.endsAt);
    });

    it('returns a result failure if the end date is before the start date', async () => {
        const updateAppointment = new UpdateAppointment();

        const input = {
            appointmentId: 'appointment-id',
            customerId: 'customer-id',
            startsAt: new Date(),
            endsAt: new Date(0),
        };

        const output = await updateAppointment.execute(input);

        expect(output.isFailure).toBe(true);
        expect(output.error).toBe('The appointment cannot end before it starts');
    });

    it('returns a result failure if the start date is in the past', async () => {
        const updateAppointment = new UpdateAppointment();

        const input = {
            appointmentId: 'appointment-id',
            customerId: 'customer-id',
            startsAt: new Date(0),
            endsAt: new Date(),
        };

        const output = await updateAppointment.execute(input);

        expect(output.isFailure).toBe(true);
        expect(output.error).toBe('The appointment cannot start in the past');
    });
});