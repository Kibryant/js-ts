import { expect, test } from 'vitest'
import { Appointment } from './appointment'

test('should create an appointment', () => {
    const { value: appointment } = Appointment.create({
        customerId: '123',
        startsAt: new Date(),
        endsAt: new Date(new Date().setDate(new Date().getDate() + 1))
    })

    expect(appointment).toBeInstanceOf(Appointment)
    expect(appointment.customerId).toBe('123')
    expect(appointment.startsAt).toBeInstanceOf(Date)
    expect(appointment.endsAt).toBeInstanceOf(Date)
})

test('should return a result failure if the end date is before the start date', () => {
    const { error, isFailure } = Appointment.create({
        customerId: '123',
        startsAt: new Date(),
        endsAt: new Date(0)
    })

    expect(error).toBe('The appointment cannot end before it starts')
    expect(isFailure).toBe(true)
})

test('should return a result failure if the start date is in the past', () => {
    const { error } = Appointment.create({
        customerId: '123',
        startsAt: new Date(0),
        endsAt: new Date()
    })

    expect(error).toBe('The appointment cannot start in the past')
})