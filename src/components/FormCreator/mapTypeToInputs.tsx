import * as React from 'react';
import TextInput from '@components/core/FormInputs/TextInput';
import NumberInput from '@components/core/FormInputs/NumberInput';
import SelectInput from '@components/core/FormInputs/SelectInput';
import SliderInput from '@components/core/FormInputs/SliderInput';
import TextMultiSelect from '@components/core/FormInputs/TextMultiSelect'

export default (type, data, lastInputField) => {
  const map = {
    text: <TextInput key={data.name} {...data} shouldFocus={lastInputField === data.name}  />,
    number: <NumberInput key={data.name} {...data} shouldFocus={lastInputField === data.name}  />,
    select: <SelectInput key={data.name} {...data} />,
    slider: <SliderInput key={data.name} {...data} />,
    textMultiSelect: <TextMultiSelect key={data.name} {...data} />
  }
  return map[type];
}