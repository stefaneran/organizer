import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import SkillContainer from '@components/SkillContainer';
import ContactsContainer from '@components/ContactsContainer';
import { CategoryType } from '@interfaces/general'

const { useState } = React;

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    '& > div': {
      height: '100%',
      width: '100%',
      padding: '0.8em'
    }
  },
  innerContainer: {
    height: '100%'
  }
})); 

const ContentView = ({ store }) => {
  const classes = useStyles();
  // "Skills" or "Contacts"
  const [currentCategory, setCurrentCategory] = useState(CategoryType.Contacts);

  const toolBarHandlers = {
    viewSkills: () => setCurrentCategory(CategoryType.Skill),
    viewContacts: () => setCurrentCategory(CategoryType.Contacts)
  }

  return (
    <div className={classes.container}>
      <Grid className={classes.innerContainer} container direction="column">
        {currentCategory === CategoryType.Skill &&
          <SkillContainer store={store} toolBarHandlers={toolBarHandlers} />
        }
        {currentCategory === CategoryType.Contacts &&
          <ContactsContainer store={store} toolBarHandlers={toolBarHandlers} />
        }
      </Grid>
    </div>
  )
}

export default ContentView;