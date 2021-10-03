import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import NutritionEditRow from 'inventory/components/NutritionEditRow';
import { InventoryItemEdit, NutritionalInfo } from 'inventory/types';
import { UnitType } from '@core/types';

const useStyles = makeStyles((theme) => createStyles({
  container: {
    '& .MuiDialog-paper': {
      minHeight: '30%',
      minWidth: '40%',
    },
    '& [role="dialog"]': {
      maxWidth: '1000px'
    }
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff'
  },
  body: {
    padding: '2.5em 1.5em'
  },
  closeIcon: {
    margin: '0.7em',
    padding: '0.2em',
    position: 'absolute',
    right: '0',
    top: '0'
  },
  addButton: {
    marginTop: '1em'
  }
}));

interface Props {
  isOpen: boolean;
  allItems: Record<string, InventoryItemEdit>;
  itemId: string;
  onClose: () => void;
  onSave: (itemId: string, nutrition: NutritionalInfo[]) => void;
}

const defaultNutritionInfo = { unit: "units" as UnitType, amount: 0, calories: 0, proteins: 0, fat: 0 };

const getNutrition = (item: InventoryItemEdit) => {
  if (!item || !item.nutrition) {
    return [defaultNutritionInfo];
  }
  return Object.values(item.nutrition);
}

const NutritionEditDialog: React.FC<Props> = ({
  isOpen,
  allItems,
  itemId,
  onClose,
  onSave
}) => {
  const classes = useStyles();

  const item = allItems[itemId];

  const [nutritionalInfo, setNutritionalInfo] = React.useState(getNutrition(item));

  const handleChange = (property: string, index: number) => (eventOrValue) => {
    const value = eventOrValue.target?.value ?? eventOrValue;
    const updatedInfo = [...nutritionalInfo];
    updatedInfo[index][property] = value;
    setNutritionalInfo(updatedInfo)
  }

  const handleAddRow = () => {
    setNutritionalInfo([
      ...nutritionalInfo,
      defaultNutritionInfo
    ])
  }

  const handleRemoveRow = (index: number) => () => {
    const filtered = nutritionalInfo.filter((row, i) => i !== index);
    setNutritionalInfo(filtered);
  }

  const handleSave = () => {
    onSave(itemId, nutritionalInfo)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className={classes.container}>
      <DialogTitle className={classes.header}>
        <Typography variant="h5">
          Add Nutritional Info
        </Typography>
        <IconButton className={classes.closeIcon} onClick={onClose} color="inherit" component="span">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        
        {nutritionalInfo.length ? nutritionalInfo.map((row, index) => (
          <NutritionEditRow 
            key={`${row.unit}-${row.amount}`} 
            row={row} 
            index={index}
            onChange={handleChange}
            onRemoveRow={handleRemoveRow}
          />
        )) : null}

        <Button
          className={classes.addButton} 
          onClick={handleAddRow}
          variant="outlined"
          color="primary"
        >
          Add
        </Button>

      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="outlined"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NutritionEditDialog;