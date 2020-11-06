import * as React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import mapTypeToInputs from './mapTypeToInputs';
import validateFormGrid from '@core/utils/validateFormGrid';
import { FormProps } from './FormCreator';

const useStyles = makeStyles(theme => ({
  gridItem: {
    margin: '1em'
  }
}));

const FormGrid = ({ formData, formGrid, lastInputField, onChange }: FormProps) => {
  const classes = useStyles();
  const isGridValid = validateFormGrid(formGrid, formData.length);

  const Input = ({ field, xs }) => {
    const data = { 
      ...field, 
      handleChange: onChange
    };
    return (
      <Grid item className={classes.gridItem} xs={xs}>
        {mapTypeToInputs(field.type, data, lastInputField)}
      </Grid>
    );
  }

  const Row = ({ xs }) => {
    const rowItems = [];
    for(let x = 0; x < formGrid.x; x += 1) {
      const nextField = formData.shift();
      if(nextField) {
        rowItems.push(nextField);
      }
    }
    return (
      <Grid data-selector="ROW" container item direction="row" className={'gridRow'}>
        {rowItems.map(field => <Input key={field.name} field={field} xs={xs} />)}
      </Grid>
    );
  }

  const buildGrid = () => {
    const rows = [];
    const xsPerInput = 12 / formGrid.x;
    for(let y = 0; y < formGrid.y; y += 1) {
      rows.push(<Row key={y} xs={xsPerInput} />)
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