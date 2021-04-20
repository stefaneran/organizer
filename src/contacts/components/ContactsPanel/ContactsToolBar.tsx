import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Tooltip, IconButton } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ContactsGroupsChips from './ContactsGroupsChips';

const useStyles = makeStyles((theme: Theme) => createStyles({
  toolbar: {
    display: 'flex'
  }
}));

const ContactsToolBar = ({
  onOpenInfo, 
  isFiltersOpen, 
  onOpenFilters, 
  onCloseFilters,
  allGroups,
  onChangeFilter
}) => {
  const classes = useStyles();
  return (
    <div className={classes.toolbar}>
      <Tooltip title="Open Filters">
        <IconButton onClick={isFiltersOpen ? onCloseFilters : onOpenFilters}>
          <FilterListIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add New Contact">
        <IconButton onClick={onOpenInfo}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </Tooltip>
      <ContactsGroupsChips 
        allGroups={allGroups} 
        onSelect={onChangeFilter}
      />
    </div>
  )
}

export default ContactsToolBar;