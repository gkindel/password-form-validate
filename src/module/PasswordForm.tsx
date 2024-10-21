import { PasswordInput } from './PasswordInput.tsx';
import React, { useCallback, useState } from 'react';
import { useFormValidator } from './validators/useFormValidator.ts';
import styled from 'styled-components';

const StyledForm = styled.form`
  text-align: left;
  background-color: #eee;
  border-radius: 1em;
  min-width: 600px;
  padding: 1rem;
  > * {
    padding: 0.5rem;
  }
  label {
    display: flex;
  }
  label span {
    width: 10rem;
    text-align: right;
    margin-right: 1rem;
  }
  input {
    flex-grow: 1;
  }
`;

const StyledFormActions = styled.div`
  text-align: right;
`;

const StyledSuccess = styled.div`
  color: green;
`;

function PasswordForm() {
  const [success, setSuccess] = useState(false);
  const { register, validate } = useFormValidator();

  const _handleSubmit = useCallback(
    (e: React.FormEvent): void => {
      const errors = validate();
      setSuccess(errors.length === 0);
      e.preventDefault();
    },
    [validate],
  );

  return (
    <StyledForm onSubmit={_handleSubmit}>
      {success && <StyledSuccess>Successfully validated!</StyledSuccess>}

      <PasswordInput name={'mypassword'} register={register} />

      <StyledFormActions>
        <button type="submit">Submit</button>
      </StyledFormActions>
    </StyledForm>
  );
}

export default PasswordForm;
