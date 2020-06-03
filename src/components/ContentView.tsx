import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button } from '@material-ui/core';

import SkillContainer from '@components/SkillContainer';

const { useState, useEffect } = React;

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    '& > div': {
      height: '100%',
      width: '100%',
      padding: '0.5em'
    }
  },
  innerContainer: {
    height: '100%'
  }
})); 

const ContentView = ({ store }) => {
  const classes = useStyles();
  // "Skills" or "Contacts"
  const [currentCategory, setCurrentCategory] = useState('Skills');

  const toolBarHandlers = {
    viewSkills: () => setCurrentCategory('Skills'),
    viewContacts: () => setCurrentCategory('Contacts')
  }

  return (
    <div className={classes.container}>
      <Grid className={classes.innerContainer} container direction="column">
        {currentCategory === 'Skills' ?
          <SkillContainer store={store} toolBarHandlers={toolBarHandlers} /> : <div></div>
        }
      </Grid>
    </div>
  )
}

export default ContentView;