import jsonwebtoken from 'jsonwebtoken';

/**
 * Create a secret token for the user with the given user_id and email
 * process.env.SECRET_TOKEN should be defined in the .env file
 * The token expires in 2 hours
 * @param user_id
 * @param email
 */
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

/**
 * Decodes a token and returns the decoded object
 * @param token
 */
export const decodeToken = (token: string) => {
    const secret_token = process.env.SECRET_TOKEN;
    if (!token) {
        return null;
    }
    if (!secret_token) {
        return null;
    }
    try {
        return jsonwebtoken.verify(token, secret_token);
    }
    catch (error) {
        console.log(error);
        return null;
    }
}