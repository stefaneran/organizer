import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import AppBar from '@core/components/AppBar';
import SkillsContainer from '@skills/container';
import ContactsContainer from '@contacts/container';
import InventoryContainer from '@inventory/container';
import { CategoryType } from '@core/interfaces/general';

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

const ContentView = ({ setLoginDialog, onLogout }) => {
  const classes = useStyles();
  // "Skills" or "Contacts"
  const [currentCategory, setCurrentCategory] = React.useState(CategoryType.Inventory);

  return (
    <div className={classes.container}>
      <Grid className="fullHeight" container direction="column">
        <AppBar
          setLoginDialog={setLoginDialog}
          setCurrentCategory={setCurrentCategory}
          onLogout={onLogout}
        />
        {currentCategory === CategoryType.Skills && (
          <SkillsContainer />
        )}
        {currentCategory === CategoryType.Contacts &&
          <ContactsContainer />
        }
        {currentCategory === CategoryType.Inventory &&
          <InventoryContainer />
        }
      </Grid>
    </div>
  )
}

export default ContentView;