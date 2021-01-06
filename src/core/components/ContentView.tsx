import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@core/components/AppBar';
import AppBarMobile from '@core/components/AppBarMobile';
import SkillsContainer from '@skills/container';
import ContactsContainer from '@contacts/container';
import InventoryContainer from '@inventory/container';
import InventoryMobileContainer from '@inventory/mobile/container';
import RecipesContainer from '@recipes/container';
import RecipesMobileContainer from '@recipes/mobile/container';
import { CategoryType } from '@core/interfaces/general';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: '100%'
  }
})); 

const ContentView = ({ isMobile, setLoginDialog, onLogout }) => {
  const classes = useStyles();
  // "Skills" or "Contacts"
  const [currentCategory, setCurrentCategory] = React.useState(CategoryType.Inventory);

  return (
    <div 
      style={{ padding: isMobile ? '' : '0.8em' }}
      className={classes.container}
    >
      {isMobile ? (
        <AppBarMobile 
          setLoginDialog={setLoginDialog}
          setCurrentCategory={setCurrentCategory}
          onLogout={onLogout}
        />
      ) : (
        <AppBar
          setLoginDialog={setLoginDialog}
          setCurrentCategory={setCurrentCategory}
          onLogout={onLogout}
        />
      )}
      <div 
        style={{ height: isMobile ? '100%' : '90%' }}
      >
        {currentCategory === CategoryType.Skills && (
          <SkillsContainer />
        )}
        {currentCategory === CategoryType.Contacts &&
          <ContactsContainer />
        }
        {currentCategory === CategoryType.Inventory && (
          <>
          {isMobile ? (
            <InventoryMobileContainer />
          ) : (
            <InventoryContainer />
          )}
          </>
        )}
        {currentCategory === CategoryType.Recipes && (
          <>
          {isMobile ? (
            <RecipesMobileContainer />
          ) : (
            <RecipesContainer />
          )}
          </>
        )}
      </div>
    </div>
  )
}

export default ContentView;