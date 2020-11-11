import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ContentToolbar from '@core/components/ContentToolbar';
import SkillsContainer from '@skills/components/SkillsContainer';
import HistoryView from '@skills/components/HistoryView';
import ContactsContainer from '@contacts/container';
import { CategoryType } from '@core/interfaces/general'

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

const ContentView = ({ setLoginDialog }) => {
  const classes = useStyles();
  // "Skills" or "Contacts"
  const [currentCategory, setCurrentCategory] = useState(CategoryType.Contacts);

  return (
    <div className={classes.container}>
      <Grid className="fullHeight" container direction="column">
        <ContentToolbar
          setLoginDialog={setLoginDialog}
          setCurrentCategory={setCurrentCategory}
        />
        {currentCategory === CategoryType.Skills && (
          {/* 
          <Grid className="fullHeight" container>
            <Grid item xs={9} className="fullHeight">
              <SkillsContainer />
            </Grid>
            <Grid item xs={3} className="fullHeight">
              <HistoryView />
            </Grid>
          </Grid> 
          */}
        )}
        {currentCategory === CategoryType.Contacts &&
          <ContactsContainer />
        }
      </Grid>
    </div>
  )
}

export default ContentView;