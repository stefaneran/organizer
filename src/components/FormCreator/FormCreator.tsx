import * as React from 'react';
import mapTypeToInputs from './mapTypeToInputs';
import FormGrid from './FormGrid';

interface FormField {
  name: string;
  type: string;
  label?: string;
  helperText?: string;
  inputValue?: any | any[];
}

export interface FormProps {
  formData: FormField[];
  formGrid?: { x: number; y: number; };
  lastInputField?: string;
  onChange(name: string, value: any): void;
}

const FormCreator = ({ formData, formGrid, lastInputField, onChange }: FormProps) => {

  const handleChange = (name, value) => {
    onChange(name, value);
  }
  
  return (
    <>
      {formGrid ? (
        <FormGrid 
          formData={formData} 
          formGrid={formGrid} 
          lastInputField={lastInputField} 
          onChange={onChange} 
        />
      ) : 
        formData.map(field => mapTypeToInputs(field.type, { ...field, handleChange }, lastInputField))
      }
    </>
  );
}

export default FormCreator;