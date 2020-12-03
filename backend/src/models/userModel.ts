import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';
import { UserSchema, UserModel } from '../types/userTypes';

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter a name"],
        minlength: [3, "Minimum name length is 3"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, "please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    address: {
        type: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            zipcode: { type: String },
            country: { type: String },
        }
    }
});


// hash password before saving
userSchema.pre<UserSchema>('save', async function (next: Function) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user
userSchema.statics.login = async function (email: string, password: string): Promise<UserSchema> {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

// static method to update username
userSchema.statics.updateUsername = async function (username: string, id: string, password: string): Promise<UserSchema> {
    const user = await userModel.findById(id);
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            const newUser = await userModel.findOneAndUpdate({ _id: id }, { $set: { name: username } }, { new: true })
            if (newUser) {
                return newUser;
            }
            throw Error('Unable to update username, Error updating database.')
        }
        throw Error('Unable to update username, Incorrect Password.')
    }
    throw Error('Unable to update username, User not found.')
};

// static method to update email
userSchema.statics.updateEmail = async function (email: string, id: string, password: string): Promise<UserSchema> {
    const user = await userModel.findById(id);
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            const validEmail = isEmail(email)
            if (validEmail) {
                const newUser = await userModel.findOneAndUpdate({ _id: id }, { $set: { email: email } }, { new: true })
                if (newUser) {
                    return newUser;
                }
                throw Error('Unable to update email, Error updating database.')
            }
            throw Error('Unable to update email, Please enter a valid email.')
        }
        throw Error('Unable to update email, Incorrect Password.')
    }
    throw Error('Unable to update email, User not found.')
};


// static method to update password
userSchema.statics.updatePassword = async function (newPassword: string, id: string, password: string): Promise<UserSchema> {
    const user = await userModel.findById(id);
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            const salt = await bcrypt.genSalt();
            newPassword = await bcrypt.hash(newPassword, salt);
            const newUser = await userModel.findOneAndUpdate({ _id: id }, { $set: { password: newPassword } }, { new: true })
            if (newUser) {
                return newUser;
            }
            throw Error('Unable to update password, Error updating database.')
        }
        throw Error('Unable to update password, Incorrect Password.')
    }
    throw Error('Unable to update password, User not found.')
};

// static method to update address
userSchema.statics.updateAddress = async function (
    street: string,
    city: string,
    state: string,
    zipcode: string,
    country: string,
    id: string,
    password: string): Promise<UserSchema> {

    const user = await userModel.findById(id);
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            const newUser = await userModel.findOneAndUpdate({ _id: id }, {
                $set: {
                    address: {
                        street: street,
                        city: city,
                        state: state,
                        zipcode: zipcode,
                        country: country
                    }
                }
            }, { new: true })
            if (newUser) {
                return newUser;
            }
            throw Error('Unable to update address, Error updating database.')
        }
        throw Error('Unable to update address, Incorrect Password.')
    }
    throw Error('Unable to update address, User not found.')
};

const userModel: UserModel = mongoose.model<UserSchema, UserModel>("User", userSchema);

export default userModel;