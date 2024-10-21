import { useCallback, useState } from 'react';

export type ValidationErrorType = string;

export interface ValidationError {
  // a unique string id for the error type
  type: ValidationErrorType;
  // a user-friendly message describing the validations error
  message: string;
}

interface UseFormValidator {
  // register a unique validator for a named form input
  register: (name: string, validator: Validator) => void;
  // validates all know form elements and returns any errors
  validate: () => ValidationError[];
}

type Validator = () => ValidationError[];

// a dictionary of validators by form element id
interface Validators {
  [name: string]: Validator;
}

export type Register = (name: string, validator: Validator) => void;

/**
 * A React hook that allows the collection of form element validators by name to be called
 * later during the pre-submit of the containing form
 * @returns {UseFormValidator}
 */
export const useFormValidator = (): UseFormValidator => {
  const [validators] = useState<Validators>({});

  // used by form elements to register their validators by form element name
  const register = useCallback(
    (name: string, validator: Validator) => {
      validators[name] = validator;
    },
    [validators],
  );

  // used during submit handler to validate
  const validate = useCallback(() => {
    return Object.values(validators).flatMap((validator) => validator());
  }, [validators]);

  return {
    validate,
    register,
  };
};
