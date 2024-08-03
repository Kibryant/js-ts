export function isValidCpf(cpf: string) {
    if (!cpf) return false;

    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) return false;

    const invalidCpfs = [
        '00000000000', '11111111111', '22222222222',
        '33333333333', '44444444444', '55555555555',
        '66666666666', '77777777777', '88888888888', '99999999999'
    ];

    if (invalidCpfs.includes(cpf)) return false;

    const calculateDigit = (cpf: string, length: number) => {
        let sum = 0;
        for (let i = 0; i < length; i++) {
            sum += parseInt(cpf.charAt(i)) * (length + 1 - i);
        }
        const remainder = 11 - (sum % 11);
        return remainder > 9 ? 0 : remainder;
    };

    const firstDigit = calculateDigit(cpf, 9);
    if (firstDigit !== parseInt(cpf.charAt(9))) return false;

    const secondDigit = calculateDigit(cpf, 10);
    if (secondDigit !== parseInt(cpf.charAt(10))) return false;

    return true;
}
