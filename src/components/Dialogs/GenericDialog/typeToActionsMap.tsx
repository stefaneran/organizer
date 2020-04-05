import * as React from 'react';
import WizardActions from './WizardActions';

export default (type, data, onClose) => {
  const map = {
    wizard: <WizardActions data={data} onClose={onClose} />
  }
  return map[type];
}