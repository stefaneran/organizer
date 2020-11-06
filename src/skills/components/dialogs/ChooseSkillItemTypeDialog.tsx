import * as React from 'react';
import { Button } from '@material-ui/core';
import { GenericDialog } from '@core/components/GenericDialog';
import { SkillItemType } from '@skills/interfaces/SkillItem.interface';

const ChooseSkillItemTypeDialog = ({ isOpen, onClose }) => {

  const handleClose = (options?) => (event?) => {
    let itemType = options ? options.type : null;
    onClose({ itemType });
  }

  return (
    <GenericDialog
      isOpen={isOpen} 
      title={"Choose Category"}
      onClose={handleClose}
    >
      <Button variant="outlined" onClick={handleClose({ type: SkillItemType.Book })}>
        Book
      </Button>
      <Button variant="outlined" onClick={handleClose({ type: SkillItemType.Course })}>
        Course
      </Button>
      <Button disabled variant="outlined" onClick={handleClose({ type: SkillItemType.Project })}>
        Project
      </Button>
    </GenericDialog>
  )
}

export default ChooseSkillItemTypeDialog;