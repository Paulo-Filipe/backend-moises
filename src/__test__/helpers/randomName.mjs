const createRandomName = (size, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => {
    const charSequence = [];

    for (const _ of new Array(size)) {
        const randIndex = Math.floor(Math.random() * chars.length);
        charSequence.push(chars.charAt(randIndex));
    }

    return charSequence.join('');
}

export default createRandomName;