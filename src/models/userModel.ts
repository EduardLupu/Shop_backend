import {Schema, model} from "mongoose";
import bcrypt from "bcrypt";

export interface Data {
    user_id: string,
    email: string
}

export interface User {
    firstName: string,
    lastName: string,
    email: string,
    birthDate: Date,
    image?: string,
    password: string,
    createdAt?: Date,
}

const userSchema = new Schema<User>({
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
        unique: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
        default: `https://robohash.org/test`,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: false
    }
});

userSchema.pre('save', async function () {
    this.image = `https://robohash.org/${this.get('_id')}`;
    if (!this.isModified('password'))
        return;
    this.password = await bcrypt.hash(this.password, 12);
})

const UserModel = model('user', userSchema);

export default UserModel;