import { useState, useCallback } from 'react';

function InputValue (field) {
  let [value, setValue] = useState('');
  let [disabled, setDisabled] = useState(false);
  let [error, setError] = useState('');

  let onChange = useCallback(function (event) {
    setValue(event.currentTarget.value);
    setError('');
  }, []);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    disabled,
    setDisabled,
    bind: {
      value,
      onChange
    },
    error,
    setError
  };
}

export default InputValue;