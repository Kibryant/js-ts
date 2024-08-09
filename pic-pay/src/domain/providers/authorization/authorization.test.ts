import { expect, test } from 'vitest';
import Authorization from './authorization';

test('Authorization class', () => {
    const authorization = new Authorization({
        transactionId: '12345',
        authorized: true,
    });

    expect(authorization.transactionId).toBe('12345');
    expect(authorization.authorized).toBe(true);

    const authorization2 = new Authorization({
        transactionId: '67890',
        authorized: false,
    });

    expect(authorization.equals(authorization2)).toBe(false);
    expect(authorization.equals(authorization)).toBe(true);
});