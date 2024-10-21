import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Register } from './validators/useFormValidator.ts';
import { validate } from './validators/validators/PasswordValidation.ts';

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

const StyledLabel = styled.label`
  display: flex;
  padding: 0.5em;
  span {
    width: 10rem;
    text-align: right;
    margin-right: 1rem;
  }
  input {
    flex-grow: 1;
    border-color: #888888;
  }
`;

export const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  passwordText = 'Password',
  confirmText = 'Confirm Password',
  register,
}) => {
  const [primary, setPrimary] = useState('');
  const [secondary, setSecondary] = useState('');

  // register our validator
  useEffect(() => register && register(name, () => validate(primary, secondary)), [name, primary, register, secondary]);

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
      <StyledLabel>
        <span>{passwordText}</span>
        <input
          type={'password'}
          data-testid={'input_password'}
          name={name}
          value={primary}
          onChange={_handlePrimaryChange}
        />
      </StyledLabel>
      <StyledLabel>
        <span>{confirmText}</span>
        <input type={'password'} data-testid={'confirm_password'} value={secondary} onChange={_handleSecondaryChange} />
      </StyledLabel>
    </>
  );
};
