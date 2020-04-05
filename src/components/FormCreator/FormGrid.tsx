import * as React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import typeToInputsMap from './typeToInputsMap';
import validateFormGrid from '@utils/validateFormGrid';
import { IFormProps } from './FormCreator';

const useStyles = makeStyles(theme => ({
  gridItem: {
    margin: '1em'
  }
}));

const FormGrid = ({ formData, formGrid, lastInputField, onChange }: IFormProps) => {
  const classes = useStyles();
  const isGridValid = validateFormGrid(formGrid, formData.length);

  const Input = ({ field }) => {
    const data = { 
      ...field, 
      handleChange: onChange
    };
    return (
      <Grid item className={classes.gridItem}>
        {typeToInputsMap(field.type, data, lastInputField)}
      </Grid>
    );
  }

  const Row = () => {
    const rowItems = [];
    for(let x = 0; x < formGrid.x; x += 1) {
      const nextField = formData.shift();
      if(nextField) {
        rowItems.push(nextField);
      }
    }
    return (
      <Grid container direction="row">
        {rowItems.map(field => <Input key={field.name} field={field} />)}
      </Grid>
    );
  }

  const buildGrid = () => {
    const rows = [];
    for(let y = 0; y < formGrid.y; y += 1) {
      rows.push(<Row key={y} />)
    }
    return rows;
  }

  return (
    <>
      {!isGridValid ? (
        <p> Error: More fields than Grid configured to handle! </p>
      ) : (
        <Grid container direction="column">
          {buildGrid()}
        </Grid>
      )}
    </>
  )
}

export default FormGrid;