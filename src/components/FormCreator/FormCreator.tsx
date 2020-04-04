import * as React from 'react';
import typeToInputsMap from './typeToInputsMap';
import FormGrid from './FormGrid';

interface IFormField {
  name: string;
  type: string;
  label?: string;
  helperText?: string;
}

export interface IFormProps {
  formData: IFormField[];
  formGrid?: { x: number; y: number; };
  onChange(name: string, value: any): void;
}

const FormCreator = ({ formData, formGrid, onChange }: IFormProps) => {

  const handleChange = (name, type) => ({ target }) => {
    const value = type !== 'checkbox' ? target.value : target.checked;
    onChange(name, value);
  }
  
  return (
    <>
      {formGrid ? (
        <FormGrid formData={formData} formGrid={formGrid} onChange={handleChange} />
      ) : 
        formData.map(field => typeToInputsMap(field.type, { ...field, handleChange }))
      }
    </>
  );
}

export default FormCreator;