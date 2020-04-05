import * as React from 'react';
import { Button } from '@material-ui/core';

interface IWizardActionsData {
  index: number;
  maxSteps: number;
  handler: (direction: -1 | 1) => () => void;
  canSkip?: boolean;
}

const WizardActions = (
  { onClose, data: { index, maxSteps, handler, canSkip } }: 
  { onClose(options?: any): (event?) => void;  data: IWizardActionsData }
) => {
  const showBack = index > 0;
  const showSkip = index <= maxSteps-1 && canSkip;
  const showNext = index < maxSteps-1;
  const showFinish = index === maxSteps-1;
  return (
    <>
      {showBack && (
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handler(-1)}
        >
          Back
        </Button>
      )}
      {showSkip && (
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handler(-1)}
        >
          Skip
        </Button>
      )}
      {showNext && (
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handler(1)}
        >
          Next
        </Button>
      )}
      {showFinish && (
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={() => { handler(1)(); onClose({ isSubmit: true })(); }}
        >
          Finish
        </Button>
      )}
    </>
  );
}

export default WizardActions;