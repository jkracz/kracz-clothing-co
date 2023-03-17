import { useState } from "react";

import {SignUpContainer} from "./sign-up-form.styles.jsx";

import {
    createAuthUserWithEmailAndPassword,
    createUserDocFromAuth
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "", 
    confirmPassword: ""
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("password fields must match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if(error.code === "auth/email-already-in-use") {
                alert("Cannot create user. Email already in use.");
            }
            console.log("user creation error", error);
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        // [name] extrapolates the provided value in the variable to be the key in the obj being set
        setFormFields({...formFields, [name]: value}); 
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with an email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput required label="Display Name" onChange={handleChange} name="displayName" value={displayName} />
                <FormInput required type="email" label="Email" onChange={handleChange} name="email" value={email} />
                <FormInput required type="password" label="Password" onChange={handleChange} name="password" value={password} />
                <FormInput required type="password" label="Confirm Password" onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm