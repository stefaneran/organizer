import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import SkillContainer from '@components/SkillContainer';
import HistoryView from '@components/HistoryView'
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
  }
})); 

const ContentView = ({ store }) => {
  const classes = useStyles();
  // "Skills" or "Contacts"
  const [currentCategory, setCurrentCategory] = useState(CategoryType.Skill);

  const toolBarHandlers = {
    viewSkills: () => setCurrentCategory(CategoryType.Skill),
    viewContacts: () => setCurrentCategory(CategoryType.Contacts)
  }

  return (
    <div className={classes.container}>
      <Grid className="fullHeight" container direction="column">
        {currentCategory === CategoryType.Skill && (
          <Grid className="fullHeight" container>
            <Grid item xs={9} className="fullHeight">
              <SkillContainer store={store} toolBarHandlers={toolBarHandlers} />
            </Grid>
            <Grid item xs={3} className="fullHeight">
              <HistoryView store={store} />
            </Grid>
          </Grid>
        )}
        {currentCategory === CategoryType.Contacts &&
          <ContactsContainer store={store} toolBarHandlers={toolBarHandlers} />
        }
      </Grid>
    </div>
  )
}

export default ContentView;