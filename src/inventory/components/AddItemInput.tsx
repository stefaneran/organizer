import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { TextField, Button } from '@material-ui/core';
import genericSort from '@core/utils/genericSort';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    display: 'flex'
  }
}))

const AddItemInput = ({ allItems, onSubmit }) => {
  const classes = useStyles();

  const options = 
    Object.keys(allItems)
      .map(id => ({ label: allItems[id].name, value: id }))
      .sort((a, b) => genericSort(a.label, b.label));

  const [currentOptions, setCurrentOptions] = React.useState(options);
  const [currentValue, setCurrentValue] = React.useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const input = e.target.value;
      if (!currentOptions.includes(input)) {
        const newOption = { label: input, value: input };
        setCurrentOptions([...currentOptions, newOption]);
        setCurrentValue(input);
      }
    }
  }

  const handleInput = (e, newValue) => setCurrentValue(newValue);

  const handleSubmit = () => {
    onSubmit(currentValue)
  }

  return (
    <div className={classes.container}>
      <Autocomplete
        style={{ flexGrow: 5 }}
        value={currentValue}
        options={currentOptions}
        onChange={handleInput}
        onKeyPress={handleKeyPress}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} size="small" variant={'outlined'} />}
      />
      <Button 
        style={{ flexGrow: 1 }}
        variant="outlined" 
        onClick={handleSubmit}
      >
        Add
      </Button>
    </div>
  )
}

export default AddItemInput;