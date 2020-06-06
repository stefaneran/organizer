import * as React from 'react';
import TextInput from '@components/FormInputs/TextInput';
import NumberInput from '@components/FormInputs/NumberInput';
import SelectInput from '@components/FormInputs/SelectInput';
import SliderInput from '@components/FormInputs/SliderInput';

export default (type, data, lastInputField) => {
  const map = {
    text: <TextInput key={data.name} {...data} shouldFocus={lastInputField === data.name}  />,
    number: <NumberInput key={data.name} {...data} shouldFocus={lastInputField === data.name}  />,
    select: <SelectInput key={data.name} {...data} />,
    slider: <SliderInput key={data.name} {...data} />
  }
  return map[type];
}