import * as React from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import SelectInput from './SelectInput';

export default (type, data, lastInputField) => {
  const map = {
    text: <TextInput key={data.name} data={data} shouldFocus={lastInputField === data.name} />,
    number: <NumberInput key={data.name} data={data} shouldFocus={lastInputField === data.name} />,
    select: <SelectInput key={data.name} data={data} />
  }
  return map[type];
}