import * as React from 'react';
import { Button } from '@material-ui/core';

interface IWizardOptions {
  index: number;
  maxSteps: number;
  handler: (direction: -1 | 1) => () => void;
}

const WizardOptions = (data: IWizardOptions) => (
  <>
    {data.index > 0 && (
      <Button variant="outlined" color="primary" onClick={data.handler(-1)}>Back</Button>
    )}
    {data.index <= data.maxSteps && (
      <Button variant="outlined" color="primary" onClick={data.handler(-1)}>Skip</Button>
    )}
    {data.index < data.maxSteps && (
      <Button variant="outlined" color="primary" onClick={data.handler(1)}>Next</Button>
    )}
    {data.index === data.maxSteps && (
      <Button variant="outlined" color="primary" onClick={data.handler(1)}>Finish</Button>
    )}
  </>
);

export default (type, data) => {
  const map = {
    wizard: WizardOptions
  }
  return map[type](data);
}