import { 
    signInWithGoogelPopup,
    createUserDocFromAuth
} from "../../utils/firebase/firebase.utils"

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGoogelPopup();
        const userDocRef = createUserDocFromAuth(response);
    }
    
    return (
        <div>
            <h1>sign in</h1>
            <button onClick={logGoogleUser}>Sign in with Google</button>
        </div>
    )
}

export default SignIn