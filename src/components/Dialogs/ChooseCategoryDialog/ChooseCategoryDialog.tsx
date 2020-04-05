import * as React from 'react';
import { Button } from '@material-ui/core';
import { GenericDialog } from '@components/Dialogs/GenericDialog';
import { CategoryType } from '@interfaces/categories';

const ChooseCategoryDialog = ({ isOpen, onClose }) => {

  const handleClose = (options?) => (event?) => {
    let categoryType = options ? options.type : null;
    onClose({ categoryType });
  }

  return (
    <GenericDialog
      isOpen={isOpen} 
      title={"Choose Category"}
      onClose={handleClose}
    >
      <Button variant="outlined" onClick={handleClose({ type: CategoryType.Skill })}>
        Skill
      </Button>
      <Button disabled variant="outlined" onClick={handleClose({ type: CategoryType.Fitness })}>
        Fitness
      </Button>
      <Button disabled variant="outlined" onClick={handleClose({ type: CategoryType.Social })}>
        Social
      </Button>
    </GenericDialog>
  );
}

export default ChooseCategoryDialog;