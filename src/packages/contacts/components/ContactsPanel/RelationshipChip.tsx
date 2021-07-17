import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Chip, Tooltip } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { RelationshipStatus } from 'contacts/types'; 

const useStyles = makeStyles(() => createStyles({
  chip: {
    color: '#fff',
    '& svg': {
      color: '#fff'
    }
  },
  miniChip: {
    width: '2em',
    height: '2em',
    borderRadius: '50%',
    padding: '0.25em',
    '& svg': {
      color: '#fff',
      width: '1.5rem',
      height: '1.5rem'
    }
  }
}));

interface Props {
  relationshipStatus: RelationshipStatus;
  mini?: boolean;
  style?: Record<string, string | number>;
}

const RelationshipChip: React.FC<Props> = ({ relationshipStatus, mini, style }) => {
  const classes = useStyles();
  const isSingle = relationshipStatus === RelationshipStatus.Single;
  const relationshipStyle = { 
    backgroundColor: isSingle ? '#06D6A0' : '#C03535',
    marginRight: '0.5em'
  }
  return (
    <Tooltip title={mini ? relationshipStatus : "Relationship Status"}>
      {mini ? (
        <div 
          className={classes.miniChip} 
          style={{ ...style, ...relationshipStyle }}
        >
          <FavoriteIcon />
        </div>
      ) : (
        <Chip 
          icon={<FavoriteIcon />}
          className={classes.chip}
          label={relationshipStatus}
          style={{ ...style, ...relationshipStyle }}
        />
      )}
      
    </Tooltip>
  )
}

export default RelationshipChip;