import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Tooltip, IconButton } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    padding: '1em',
  },
  item: {
    marginRight: '0.5em',
    maxWidth: '150px'
  },
  select: { 
    height: '2.5em',
    '& > div': {
      paddingTop: '0',
      paddingBottom: '0'
    }
  },
}));

interface Props {
  onOpenEdit: (activityId?: string) => void;
  toggleFilterPanel: () => void;
}

const ActivitiesToolbar: React.FC<Props> = ({
  onOpenEdit,
  toggleFilterPanel
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
        <IconButton onClick={() => onOpenEdit()}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default ActivitiesToolbar;