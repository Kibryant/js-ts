import { expect, test } from 'vitest'
import { Customer } from './customer'

test('should create a customer', () => {
    const customer = Customer.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com'
    })

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.id).toBeTruthy()
    expect(customer.name).toBe('John Doe')
    expect(customer.email).toBe('johndoe@gmail.com')
})

test('should create a customer with an id', () => {
    const customer = Customer.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com'
    }, '123')

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.id).toBe('123')
    expect(customer.name).toBe('John Doe')
    expect(customer.email).toBe('johndoe@gmail.com')
})