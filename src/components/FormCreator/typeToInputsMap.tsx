import * as React from 'react';
import TextInput from './TextInput';

export default (type, data) => {
  const map = {
    text: <TextInput key={data.name} data={data} />
  }
  return map[type];
}