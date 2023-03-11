export function displayUserName(user) {

    if (! user) return;

    const { name, email, firstName, lastName } = user;

    return `${firstName || name?.first || email} ${lastName || name?.last || ''}`;
}
