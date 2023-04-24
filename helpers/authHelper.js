import bcrypt from 'bcrypt';

export const hashpassword = async (password) => {
    try {
        const saltpassword = 10;
        const hashedpassword = await bcrypt.hash(password, saltpassword)
        return hashedpassword;
    } catch (error) {
        console.log(error)
    }
}

export const comparepassword = async (password, hashedpassword) => {
    return bcrypt.compare(password, hashedpassword)
}

