import * as React from 'react';

const FormCreator = ({ formData, onChange }) => {

  const handleChange = (name, type) => ({ target }) => {
    onChange(name, target.value);
  }
  
  return (
    <>
    </>
  );
}

export default FormCreator;