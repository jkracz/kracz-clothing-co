import { useState } from "react";

import {
    signInWithGoogelPopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

const defaultFormFields = {
    email: "",
    password: "",
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGoogelPopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields(defaultFormFields);
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("incorrect password");
                    break;
                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break;
                default:
                    console.log("user sign in error", error);
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        // [name] extrapolates the provided value in the variable to be the key in the obj being set
        setFormFields({...formFields, [name]: value}); 
    };

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput required type="email" label="Email" name="email" value={email} onChange={handleChange} />
                <FormInput required type="password" label="Password" name="password" value={password} onChange={handleChange} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button onClick={signInWithGoogle} buttonType="google">Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;