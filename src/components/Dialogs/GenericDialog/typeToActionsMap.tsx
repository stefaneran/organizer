import * as React from 'react';
import { Button } from '@material-ui/core';

interface IWizardActionsData {
  index: number;
  maxSteps: number;
  handler: (direction: -1 | 1) => () => void;
  canSkip?: boolean;
}

const WizardOptions = ({ data: { index, maxSteps, handler, canSkip } }: { data: IWizardActionsData }) => (
  <>
    {index > 0 && (
      <Button variant="outlined" color="primary" onClick={handler(-1)}>Back</Button>
    )}
    {index <= maxSteps && canSkip && (
      <Button variant="outlined" color="primary" onClick={handler(-1)}>Skip</Button>
    )}
    {index < maxSteps && (
      <Button variant="outlined" color="primary" onClick={handler(1)}>Next</Button>
    )}
    {index === maxSteps && (
      <Button variant="outlined" color="primary" onClick={handler(1)}>Finish</Button>
    )}
  </>
);

export default (type, data) => {
  const map = {
    wizard: <WizardOptions data={data} />
  }
  return map[type];
}