import {Schema, model} from "mongoose";

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    birthDate: Date,
    image: string,
    username: string,
    password: string,
}

const userSchema = new Schema<User>({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});

const UserModel = model('user', userSchema);

export default UserModel;