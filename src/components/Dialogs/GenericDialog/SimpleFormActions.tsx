import * as React from 'react';
import { Button } from '@material-ui/core';

const SimpleFormActions = ({ onClose }: { onClose({ isSubmit: boolean }): (event?) => void; }) => {
  return (
    <>
      <Button 
        variant="outlined" 
        color="primary" 
        onClick={onClose({ isSubmit: false })}
      >
        Cancel
      </Button>
      <Button 
        variant="outlined" 
        color="primary" 
        onClick={onClose({ isSubmit: true })}
      >
        Submit
      </Button>
    </>
  );
}

export default SimpleFormActions;