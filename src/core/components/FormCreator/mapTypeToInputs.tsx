import * as React from 'react';
import TextInput from '@core/components/FormInputs/TextInput';
import NumberInput from '@core/components/FormInputs/NumberInput';
import SelectInput from '@core/components/FormInputs/SelectInput';
import SliderInput from '@core/components/FormInputs/SliderInput';
import TextMultiSelect from '@core/components/FormInputs/TextMultiSelect'

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