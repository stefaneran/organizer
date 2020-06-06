import * as React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  innerContainer: {
    height: '100%',
    maxWidth: 'none'
  }
}));

const ContactsView = ({ store }) => {
  const classes = useStyles();
  const { data: { contacts } } = store;

  return (
    <Grid className={classes.innerContainer} container item spacing={1} xs={11}>
      <Grid container item xs={8} spacing={1}>
        
      </Grid>
      <Grid container item xs={4} spacing={1}>

      </Grid>
    </Grid>
  )
}

export default ContactsView;