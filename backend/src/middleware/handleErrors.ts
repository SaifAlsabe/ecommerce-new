// handle errors
export const handleErrors = (err: any) => {
    // console.log(err.message, err.code);
    let errors: any = {
        name: '',
        email: '',
        password: '',
        updateUsername: '',
        updateEmail: '',
        updatePassword: '',
        updateAddress: ''
    };

    // update password errors
    if (err.message === 'Unable to update password, Error updating database.') {
        errors.updatePassword = 'Unable to password address, Error updating database.';
    }

    if (err.message === 'Unable to update password, Incorrect Password.') {
        errors.updatePassword = 'Unable to update password, Incorrect Password.';
    }

    if (err.message === 'Unable to update password, User not found.') {
        errors.updatePassword = 'Unable to update password, User not found.';
    }

    // update address errors
    if (err.message === 'Unable to update address, Error updating database.') {
        errors.updateAddress = 'Unable to update address, Error updating database.';
    }

    if (err.message === 'Unable to update address, Incorrect Password.') {
        errors.updateAddress = 'Unable to update address, Incorrect Password.';
    }

    if (err.message === 'Unable to update address, User not found.') {
        errors.updateAddress = 'Unable to update address, User not found.';
    }

    // update username errors
    if (err.message === 'Unable to update username, Error updating database.') {
        errors.updateUsername = 'Unable to update username, Error updating database.';
    }

    if (err.message === 'Unable to update username, Incorrect Password.') {
        errors.updateUsername = 'Unable to update username, Incorrect Password.';
    }

    if (err.message === 'Unable to update username, User not found.') {
        errors.updateUsername = 'Unable to update username, User not found.';
    }

    //update email errors
    if (err.message === 'Unable to update email, Error updating database.') {
        errors.updateEmail = 'Unable to update email, Error updating database.';
    }

    if (err.message === 'Unable to update email, Incorrect Password.') {
        errors.updateEmail = 'Unable to update email, Incorrect Password.';
    }

    if (err.message === 'Unable to update email, User not found.') {
        errors.updateEmail = 'Unable to update email, User not found.';
    }

    if (err.message === 'Please enter a valid email') {
        errors.updateEmail = 'Please enter a valid email';
    }

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'Email is not registered';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'Password is incorrect';
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // // validation errors
    if (err.message.includes('User validation failed')) {
        // console.log(err);
        Object.values<any>(err.errors).forEach(({ properties }) => {
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}