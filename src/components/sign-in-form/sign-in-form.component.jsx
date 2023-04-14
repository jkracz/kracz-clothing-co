import { useState } from "react";

import {SignInContainer, ButtonsContainer} from "./sign-in-form.styles.jsx";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { useDispatch } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
    email: "",
    password: "",
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const dispatch = useDispatch();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
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
        <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput required type="email" label="Email" name="email" value={email} onChange={handleChange} />
                <FormInput required type="password" label="Password" name="password" value={password} onChange={handleChange} />
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;