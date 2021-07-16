import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Tooltip, IconButton } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import UpdateIcon from '@material-ui/icons/Update';
import SwitchInput from 'core/components/inputs/SwitchInput';
import { EventFilters } from 'contacts/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    marginBottom: '1em'
  }
}));

const switchIconStyle = {
  height: '1.2em', 
  width: '1.2em',
  position: 'relative' as const,
  top: '0.2em'
}

const UpcomingIcon = () => {
  return (
    <Tooltip title="Upcoming Events">
      <UpdateIcon style={{ ...switchIconStyle, right: '0.2em' }} />
    </Tooltip>
  )
}

const PastIcon = () => {
  return (
    <Tooltip title="Past Events">
      <HistoryIcon style={{ ...switchIconStyle, left: '0.2em' }} />
    </Tooltip>
  )
}

interface Props {
  onOpenInfo: (eventId?: string) => void;
  toggleFilterPanel: () => void;
  eventsFilters: EventFilters;
  onChangeFilter: (property: any) => (value: any) => void;
}

const EventsToolbar: React.FC<Props> = ({ 
  onOpenInfo, 
  toggleFilterPanel, 
  eventsFilters, 
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

      <SwitchInput 
        isChecked={eventsFilters.showUpcoming}
        onChange={onChangeFilter('showUpcoming')}
        uncheckedIcon={<PastIcon />}
        checkedIcon={<UpcomingIcon />}
      />
    </div>
  )
}

export default EventsToolbar;