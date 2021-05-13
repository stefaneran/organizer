import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    padding: '0 1em 1em 1em',
    textAlign: 'left',
    marginTop: '1em'
  },
  chip: {
    marginRight: '0.5em'
  }
}));

const ContactInfoGroups = ({ contactGroups }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <>
        {contactGroups ? contactGroups.map(group => (
          <Chip 
            className={classes.chip}
            key={group} 
            label={group}
            color="primary"
          />
        )) : null}
      </>
    </div>
  )
}

export default ContactInfoGroups;