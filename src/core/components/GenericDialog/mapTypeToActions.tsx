import * as React from 'react';
import SimpleFormActions from './SimpleFormActions';
import WizardActions from './WizardActions';

export default (type, data, onClose) => {
  const map = {
    simpleForm: <SimpleFormActions onClose={onClose} />,
    wizard: <WizardActions data={data} onClose={onClose} />,
  }
  return map[type];
}