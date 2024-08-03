export function isValidPhone(phone: string) {
    if (!phone)
        return false;
    phone = phone.replace(/[^\d]+/g, '');
    if (phone.length !== 11)
        return false;
    return true;
}