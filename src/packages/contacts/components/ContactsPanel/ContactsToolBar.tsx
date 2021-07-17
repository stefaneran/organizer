import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Tooltip, IconButton } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ChipsGroup from 'core/components/ChipsGroup';
import { ContactFilters } from 'contacts/types';

const useStyles = makeStyles(() => createStyles({
  container: {
    display: 'flex'
  }
}));

interface Props {
  groups: string[];
  contactsFilters: ContactFilters;
  onOpenInfo: (contactId?: string) => void;
  toggleFilterPanel: () => void;
  onChangeFilter: (filter: string) => (value: string) => void;
}

const ContactsToolBar: React.FC<Props> = ({
  groups,
  contactsFilters,
  onOpenInfo, 
  toggleFilterPanel,
  onChangeFilter
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Tooltip title="Open Filters">
        <IconButton onClick={toggleFilterPanel}>
          <FilterListIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add New Contact">
        <IconButton onClick={() => onOpenInfo()}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </Tooltip>
      <ChipsGroup 
        options={groups} 
        selectedOption={contactsFilters.group}
        onSelect={onChangeFilter('group')}
      />
    </div>
  )
}

export default ContactsToolBar;