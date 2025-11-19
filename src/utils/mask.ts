export const maskSensitive = (data: any) => {
    if (!data) return data;

    const clone = { ...data };

    if (clone.email) {
        const email = clone.email;
        const first = email[0];
        const last = email[email.length - 1];

        const middle = "*".repeat(email.length - 2);

        clone.email = `${first}${middle}${last}`;
    }
    return clone;
}