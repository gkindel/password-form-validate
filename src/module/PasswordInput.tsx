import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Register, ValidationError } from './validators/useFormValidator.ts';
import { validateMatch, validatePassword } from './validators/validators/PasswordValidation.ts';

/*
    Using React, write a password entry library that meets the following requirements:

    Has two input fields to validate the entry from the user (both inputs must match)
    Password has a min length of 6 characters
    Password has at least 1 uppercase character
    Password has at least 1 lowercase character
    Password has at least 1 number
    Password has at least 1 special character (!@#$%^&*()_-+={[}]|:;"'<,>.)
    Has a submit button that will trigger validation and present success or why the password entry failed
 */
export interface PasswordInputProps {
  name: string;
  passwordText?: string;
  confirmText?: string;
  register?: Register;
}

const StyledLabel = styled.label<{ $hasError?: boolean }>`
  display: flex;
  padding: 0.5em;
  color: ${(props) => (props.$hasError ? 'red' : 'inherit')};

  span {
    width: 10rem;
    text-align: right;
    margin-right: 1rem;
  }
  input {
    flex-grow: 1;
    border-style: solid;
  }
  input:focus {
    border-color: inherit;
  }
`;

const StyledErrors = styled.div`
  color: red;
`;

export const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  passwordText = 'Password',
  confirmText = 'Confirm Password',
  register,
}) => {
  const [primary, setPrimary] = useState('');
  const [secondary, setSecondary] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<ValidationError[]>([]);
  const [confirmErrors, setConfirmErrors] = useState<ValidationError[]>([]);

  const validationCallback = useCallback(() => {
    const passwordErrors = validatePassword(primary);
    setPasswordErrors(passwordErrors);
    const confirmErrors = validateMatch(primary, secondary);
    setConfirmErrors(confirmErrors);
    return [...passwordErrors, ...confirmErrors];
  }, [primary, secondary]);

  // register our validator
  useEffect(() => {
    if (register) register(name, validationCallback);
  }, [name, validationCallback]);

  const _handlePrimaryChange = useCallback(
    (e: React.ChangeEvent): void => {
      setPrimary((e.currentTarget as HTMLInputElement).value);
    },
    [setPrimary],
  );

  const _handleSecondaryChange = useCallback(
    (e: React.ChangeEvent): void => {
      setSecondary((e.currentTarget as HTMLInputElement).value);
    },
    [setSecondary],
  );

  return (
    <>
      <StyledErrors role={'alert'} aria-live="assertive">
        {passwordErrors.map((e: ValidationError) => (
          <div key={e.type}>{e.message}</div>
        ))}
        {confirmErrors.map((e: ValidationError) => (
          <div key={e.type}>{e.message}</div>
        ))}
      </StyledErrors>

      <StyledLabel $hasError={passwordErrors.length > 0}>
        <span>{passwordText}</span>
        <input
          type={'password'}
          data-testid={'input_password'}
          name={name}
          value={primary}
          onChange={_handlePrimaryChange}
        />
      </StyledLabel>

      <StyledLabel $hasError={confirmErrors.length > 0}>
        <span>{confirmText}</span>
        <input type={'password'} data-testid={'confirm_password'} value={secondary} onChange={_handleSecondaryChange} />
      </StyledLabel>
    </>
  );
};
