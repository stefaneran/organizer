import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Select, MenuItem } from '@material-ui/core';
import MobileAutocomplete from '@core/components/MobileAutocomplete';
import { FilterListIconLarge } from '@core/components/Icons/ListIcon';

const useStyles = makeStyles((theme: Theme) => createStyles({
  mobileSelect: {
    marginBottom: '100px',
    fontSize: '3rem'
  },
  mobileSelectOption: {
    fontSize: '3rem',
  },
  mobileTextField: {
    marginBottom: '100px',
    '& > div': {
      fontSize: '3rem'
    }
  },
  navRight: {
    position: 'absolute',
    right: '3em',
    top: '2em'
  },
}));

interface Props {
  toggleFilterMenuOpen;
  nationalityOptions: string[];
  categoryOptions: string[];
  selectedNationality: string;
  onSelectNationality;
  selectedCategory: string;
  onSelectCategory;
  textFilter: string;
  onTextFilterInput;
}

const RecipeFilters = ({
  toggleFilterMenuOpen,
  nationalityOptions,
  categoryOptions,
  selectedNationality,
  onSelectNationality,
  selectedCategory,
  onSelectCategory,
  textFilter,
  onTextFilterInput
}: Props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.navRight} onClick={toggleFilterMenuOpen}>
        <FilterListIconLarge />
      </div>
      <Select 
        value={selectedNationality} 
        onChange={onSelectNationality}
        variant="outlined"
        className={classes.mobileSelect}
        fullWidth
      >
        <MenuItem value={'All'} className={classes.mobileSelectOption}>
          All
        </MenuItem>
        {nationalityOptions.map(nationality => (
          <MenuItem 
            key={nationality} 
            value={nationality} 
            className={classes.mobileSelectOption}
          >
            {nationality}
          </MenuItem>
        ))}
      </Select>
      <Select 
        value={selectedCategory === '' ? 'All' : selectedCategory} 
        onChange={onSelectCategory}
        variant="outlined"
        className={classes.mobileSelect}
        fullWidth
      >
        <MenuItem value={'All'} className={classes.mobileSelectOption}>
          All
        </MenuItem>
        {categoryOptions.map(category => (
          <MenuItem 
            key={category} 
            value={category} 
            className={classes.mobileSelectOption}
          >
            {category}
          </MenuItem>
        ))}
      </Select>
      <TextField
        value={textFilter}
        onChange={onTextFilterInput}
        className={classes.mobileTextField}
        variant="outlined"
        size="medium"
        placeholder="Name Filter"
        fullWidth
      />
    </>
  )
}

export default RecipeFilters;

/*
<Autocomplete
        options={categoryOptions}
        value={selectedCategory}
        onChange={onSelectCategory}
        getOptionLabel={(option) => option}
        className={classes.mobileAutocomplete}
        fullWidth
        renderInput={(params) => 
          <TextField 
            {...params}
            label="Category Filter"  
            size="medium" 
            variant="outlined" 
          />
        }
      />
*/