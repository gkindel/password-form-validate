import {ValidationError, ValidationErrorType} from "./useFormValidator.ts";


export type ValidationCheck = (primary:string, secondary: string) => ValidationError[];


// Password has at least 1 uppercase character
export const ValidateUppercase:ValidationCheck = (primary) => {
    return primary.match(/[A-Z]/) ? [] : [{
        type: 'REQUIRED_UPPERCASE' as ValidationErrorType,
        message: 'Password requires at least 1 uppercase character',
    }]
}

// Password has at least 1 lowercase character
export const ValidateLowercase:ValidationCheck = (primary) => {
    return primary.match(/[a-z]/) ? [] : [{
        type: 'REQUIRED_LOWERCASE' as ValidationErrorType,
        message: 'Password requires at least 1 lowercase character',
    }]
}

// Password has a min length of 6 characters
export const ValidateLength:ValidationCheck = (primary) => {
    return primary.match(/.{6}/) ? [] : [{
        type: 'REQUIRED_LENGTH' as ValidationErrorType,
        message: 'Password requires at least 6 characters',
    }]
}

// Password has at least 1 number
export const ValidateNumber:ValidationCheck = (primary) => {
    return primary.match(/\d/) ? [] : [{
        type: 'REQUIRED_NUMBER' as ValidationErrorType,
        message: 'Password requires at least 1 number',
    }]
}

// Password has at least 1 special character (!@#$%^&*()_-+={[}]|:;"'<,>.)
export const ValidateSpecial:ValidationCheck = (primary) => {
    const pattern = /[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/;
    return primary.match(pattern) ? [] : [{
        type: 'REQUIRED_SPECIAL' as ValidationErrorType,
        message: 'Password requires at least 1 special character (!@#$%^&*()_-+={[}]|:;"\'<,>.)',
    }]
}

// Passwords should match
export const ValidateMatch:ValidationCheck = (primary, secondary) => {
    return primary === secondary ? [] : [{
        type: 'REQUIRED_MATCH' as ValidationErrorType,
        message: 'Password should match',
    }]
}

const DefaultValidators = [
    ValidateMatch,
    ValidateUppercase,
    ValidateLowercase,
    ValidateLength,
    ValidateNumber,
    ValidateSpecial,
];

export const validate = (
    primary:string,
    secondary:string,
    validators:ValidationCheck[] = DefaultValidators
) :ValidationError[] => {
    return validators.flatMap( check => check(primary, secondary) );
}
