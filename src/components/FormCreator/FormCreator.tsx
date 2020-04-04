import * as React from 'react';
import typeToInputsMap from './typeToInputsMap';

interface IFormField {
  name: string;
  type: string;
  label?: string;
  helperText?: string;
}

interface IFormCreatorProps {
  formData: IFormField[];
  onChange(name: string, value: any): void;
}

const FormCreator = ({ formData, onChange }: IFormCreatorProps) => {

  const handleChange = (name, type) => ({ target }) => {
    const value = type !== 'checkbox' ? target.value : target.checked;
    onChange(name, value);
  }
  
  return (
    <>
      {formData.map(field => {
        const { name, type, ...passThroughs } = field;
        const data = { name, type, handleChange, ...passThroughs };
        return typeToInputsMap(type, data);
      })}
    </>
  );
}

export default FormCreator;