import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@core/components/AppBar';
import SkillsContainer from '@skills/container';
import ContactsContainer from '@contacts/container';
import InventoryContainer from '@inventory/container';
import RecipesContainer from '@recipes/container';
import { CategoryType } from '@core/interfaces/general';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: '100%',
    padding: '0.8em'
  },
  contentContainer: {
    height: '90%'
  }
})); 

const ContentView = ({ setLoginDialog, onLogout }) => {
  const classes = useStyles();
  // "Skills" or "Contacts"
  const [currentCategory, setCurrentCategory] = React.useState(CategoryType.Inventory);

  return (
    <div className={classes.container}>
      <AppBar
        setLoginDialog={setLoginDialog}
        setCurrentCategory={setCurrentCategory}
        onLogout={onLogout}
      />
      <div className={classes.contentContainer}>
        {currentCategory === CategoryType.Skills && (
          <SkillsContainer />
        )}
        {currentCategory === CategoryType.Contacts &&
          <ContactsContainer />
        }
        {currentCategory === CategoryType.Inventory &&
          <InventoryContainer />
        }
        {currentCategory === CategoryType.Recipes &&
          <RecipesContainer />
        }
      </div>
    </div>
  )
}

export default ContentView;