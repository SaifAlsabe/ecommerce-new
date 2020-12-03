import { Document, Model, ObjectId } from "mongoose";

// userSchema interface
export interface UserSchema extends Document {
    _id:  any;
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    address?: {
        street: string;
        city: string;
        state: string;
        zipcode: string;
        country: string;
    }
}


// UserModel interface to add static methods
export interface UserModel extends Model<UserSchema> {
    login(email: string, password: string): Promise<UserSchema>,
    updateUsername(username: string, token: string, password: string): Promise<UserSchema>,
    updateEmail(email: string, token: string, password: string): Promise<UserSchema>,
    updatePassword(newPassword: string, token: string, password: string): Promise<UserSchema>,
    updateAddress(street: string, city: string, state: string, zipcode: string, country: string, id: string, password: string): Promise<UserSchema>
}


export interface UserSignupInfo {
    name: string;
    email: string;
    password: string;
}

