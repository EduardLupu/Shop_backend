import jsonwebtoken from 'jsonwebtoken';
export const createSecretToken = (user_id: string, email: string) => {
    const secret_token = process.env.SECRET_TOKEN;
    if (!secret_token) {
        throw new Error('Secret token is not defined');
    }
    return jsonwebtoken.sign({
        user_id: user_id,
        email: email
    }, secret_token, {
        expiresIn: '2h'
    });
}
export const decodeToken = (token: string) => {
    const secret_token = process.env.SECRET_TOKEN;
    if (!token) {
        return null;
    }
    if (!secret_token) {
        return null;
    }
    return jsonwebtoken.verify(token, secret_token);
}