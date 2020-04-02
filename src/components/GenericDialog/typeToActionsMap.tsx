import * as React from 'react';
import { Button } from '@material-ui/core';

const WizardOptions = (
  data: { index: number; max: number; handleClick(direction: number): () => void; }
) => (
  <>
    {data.index > 0 && (
      <Button variant="outlined" color="primary" onClick={data.handleClick(-1)}>Back</Button>
    )}
    {data.index <= data.max && (
      <Button variant="outlined" color="primary" onClick={data.handleClick(-1)}>Skip</Button>
    )}
    {data.index < data.max && (
      <Button variant="outlined" color="primary" onClick={data.handleClick(1)}>Next</Button>
    )}
    {data.index === data.max && (
      <Button variant="outlined" color="primary" onClick={data.handleClick(1)}>Finish</Button>
    )}
  </>
);

export default (type, data) => {
  const map = {
    wizard: WizardOptions
  }
  return map[type](data);
}