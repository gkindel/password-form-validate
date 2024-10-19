import {useCallback, useState} from "react";

export type ValidationErrorType = string;

export interface ValidationError {
    type: ValidationErrorType,
    message: string
}

type Validator = () => ValidationError[];
interface Validators { [name: string] : Validator };

export type Register = (name:string, validator:Validator) => void;

export const useFormValidator = () => {
    const [validators] = useState<Validators>({});

    // used by form elements to register their validators by form element name
    const register:Register = useCallback( (name:string, validator:Validator) => {
        validators[name] = validator;
    }, [validators]);

    // used during submit handler to validate
    const validate = useCallback(() => {
        return Object.values(validators).flatMap( validator => validator())
    }, [validators]);

    return {
        validate,
        register,
    }
}