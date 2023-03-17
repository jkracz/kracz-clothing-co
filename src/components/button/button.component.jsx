import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles.jsx";

// we will control how our button renders by receiving a 
export const BUTTON_TYPE_CLASSES = {
    base: "base",
    google: "google-sign-in",
    inverted: "inverted"
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
    // basically you create a map, and based on the provided button class you return the specific component
    // below, I am just returning the button at the provided index
    // the returned expression evaluates into a single element
    return (
        {
            [BUTTON_TYPE_CLASSES.base]: BaseButton,
            [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
            [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
        }[buttonType]
    )
}

const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);

    return (
        <CustomButton {...otherProps}>
            {children}
        </CustomButton>
    )
}

export default Button;