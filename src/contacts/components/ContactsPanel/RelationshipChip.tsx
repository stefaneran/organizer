import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chip, Tooltip } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { RelationshipStatus } from '@contacts/types.d'; 

const useStyles = makeStyles((theme: Theme) => createStyles({
  chip: {
    marginRight: '0.5em',
    color: '#fff',
    '& svg': {
      color: '#fff'
    }
  }
}));

interface Props {
  relationshipStatus: RelationshipStatus;
  style?;
}

const RelationshipChip: React.FC<Props> = ({ relationshipStatus, style }) => {
  const classes = useStyles();
  const isSingle = relationshipStatus === RelationshipStatus.Single;
  const relationshipStyle = { backgroundColor: isSingle ? '#06D6A0' : '#C03535' }
  return (
    <Tooltip title="Relationship Status">
      <Chip 
        icon={<FavoriteIcon />}
        className={classes.chip}
        label={relationshipStatus}
        style={{ ...style, ...relationshipStyle }}
      />
    </Tooltip>
  )
}

export default RelationshipChip;