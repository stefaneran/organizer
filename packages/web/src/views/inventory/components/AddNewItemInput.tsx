import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { TextField, Button } from '@material-ui/core';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import getCategoryOptions from 'inventory/utils/getCategoryOptions';
import { InventoryItemEdit } from 'inventory/types';
import { InputEvent, AutoCompleteHandler } from '@core/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    width: '100%',
    margin: '0.5em 0 1.5em 0'
  },
  inputsContainer: {
    flexGrow: 1,
    paddingLeft: '1em',
    textAlign: 'left'
  },
  buttonsContainer: {
    flexGrow: 1
  },
  input: {
    marginBottom: '0.5em',
    width: '99%'
  },
  button: {
    marginTop: '1em'
  }
}))

interface Props {
  allItems: Record<string, InventoryItemEdit>;
  onSubmit: (item: InventoryItemEdit) => void;
}

const AddNewItemInput: React.FC<Props> = ({ allItems, onSubmit }) => {
  const classes = useStyles();

  const [currentNameValue, setCurrentNameValue] = React.useState('');
  const [currentCategoryValue, setCurrentCategoryValue] = React.useState('');

  const categoryOptions = getCategoryOptions(currentCategoryValue, allItems);

  const handleNameInput = (event: InputEvent) => {
    setCurrentNameValue(event.target.value);
  }
  const handleCategorySelect: AutoCompleteHandler = (event, newValue) => {
    if (newValue) {
      setCurrentCategoryValue(newValue);
    }
  }
  const handleCategoryInput = (event: InputEvent) => {
    setCurrentCategoryValue(event.target.value);
  }
  const handleSubmit = () => {
    const hasName = Boolean(currentNameValue?.length);
    const hasCategory = Boolean(currentCategoryValue?.length);
    if (hasName && hasCategory) {
      onSubmit({ name: currentNameValue, category: currentCategoryValue })
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.inputsContainer}>
        <TextField 
          className={classes.input}
          value={currentNameValue}
          onChange={handleNameInput}
          label="Name" 
          size="small" 
          variant="outlined" 
          fullWidth
        />
        <Autocomplete
          className={classes.input}
          value={currentCategoryValue}
          options={categoryOptions}
          onChange={handleCategorySelect}
          getOptionLabel={(option) => option}
          noOptionsText={<></>}
          renderInput={(params) => 
            <TextField 
              {...params} 
              onChange={handleCategoryInput} 
              label="Category"  
              size="small" 
              variant={'outlined'} 
            />
          }
        />
      </div>
      <div className={classes.buttonsContainer}>
        <Button 
          className={classes.button}
          variant="outlined" 
          color="primary"
          onClick={handleSubmit}
          startIcon={<AddOutlinedIcon />}
        >
          Add New
        </Button>
      </div>
    </div>
  )
}

export default AddNewItemInput;