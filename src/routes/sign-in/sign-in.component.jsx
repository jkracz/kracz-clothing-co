import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth"

import {
    auth, 
    signInWithGoogelPopup,
    createUserDocFromAuth,
    signInWithGoogleRedirect
} from "../../utils/firebase/firebase.utils"

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    useEffect(() => {
        async function fetchRedirectInfo() {
            const response = await getRedirectResult(auth);
            if(response) {
                console.log(response)
                const userDocRef = createUserDocFromAuth(response.user);
            }
        }
        fetchRedirectInfo()
    }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGoogelPopup();
        console.log(user);
        const userDocRef = createUserDocFromAuth(user);
    }
    
    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>Sign in with Google Pop-up</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn