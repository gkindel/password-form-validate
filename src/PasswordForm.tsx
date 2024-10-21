import { PasswordInput } from './module/PasswordInput.tsx';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useFormValidator, ValidationError } from './module/validators/useFormValidator.ts';

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

const StyledErrors = styled.div`
  color: red;
`;
const StyledSuccess = styled.div`
  color: green;
`;

function PasswordForm() {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [success, setSuccess] = useState(false);

  const { register, validate } = useFormValidator();

  const _handleSubmit = useCallback(
    (e: React.FormEvent): void => {
      const errors = validate();
      setSuccess(errors.length === 0);
      setErrors(errors);
      e.preventDefault();
    },
    [validate],
  );

  return (
    <div>
      <h3>{'<PasswordInput>'} component w/ validation</h3>
      <StyledForm onSubmit={_handleSubmit}>
        {success && <StyledSuccess>Successfully validated!</StyledSuccess>}
        <StyledErrors>
          {errors.map((e: ValidationError, i) => (
            <div key={i}>{e.message}</div>
          ))}
        </StyledErrors>
        <PasswordInput name={'mypassword'} register={register} />

        <StyledFormActions>
          <button type="submit">Submit</button>
        </StyledFormActions>
      </StyledForm>
    </div>
  );
}

export default PasswordForm;
