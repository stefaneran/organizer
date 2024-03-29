import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { TrashIconXS } from '@core/components/Icons/DeleteIcon';

const useStyles = makeStyles(() => createStyles({
  buttonContainer: {
    marginTop: '1em',
    textAlign: 'center'
  },
  button: {
    marginRight: '1em'
  }
}))

interface Props {
  isCreate: boolean;
  onSubmit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const EditButtonGroup: React.FC<Props> = ({ 
  isCreate, 
  onSubmit, 
  onDelete, 
  onClose 
}) => {
  const classes = useStyles();
  return (
    <div className={classes.buttonContainer}>
      <Button
        className={classes.button}
        variant="outlined" 
        color="primary"
        onClick={onSubmit}
      >
        Save
      </Button>
      {!isCreate ? (
        <Button
          className={classes.button}
          variant="outlined" 
          color="secondary"
          onClick={onDelete}
          endIcon={<TrashIconXS />}
        >
          Delete
        </Button>
      ) : null}
      <Button
        variant="outlined" 
        color="secondary"
        onClick={onClose}
        endIcon={<CloseIcon />}
      >
        Cancel
      </Button>
    </div>
  )
}

export default EditButtonGroup;