import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@core/components/AppBar';
import AppBarMobile from '@core/components/AppBarMobile';
import ActivitiesContainer from '@activities/container';
import ContactsContainer from '@contacts/container';
import InventoryContainer from '@inventory/container';
import InventoryMobileContainer from '@inventory/mobile/container';
import RecipesContainer from '@recipes/container';
import RecipesMobileContainer from '@recipes/mobile/container';
import CategoryType from '@core/interfaces/CategoryType.enum';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: '100%'
  }
})); 

const ContentView = ({ app, setLoginDialog, onLogout }) => {
  const classes = useStyles();
  const { isMobile } = app;
  const [currentCategory, setCurrentCategory] = React.useState(CategoryType.Activities);
  return (
    <div 
      style={{ padding: isMobile ? '' : '0.8em' }}
      className={classes.container}
    >
      {isMobile ? (
        <AppBarMobile 
          app={app}
          setLoginDialog={setLoginDialog}
          setCurrentCategory={setCurrentCategory}
          onLogout={onLogout}
        />
      ) : (
        <AppBar
          app={app}
          setLoginDialog={setLoginDialog}
          setCurrentCategory={setCurrentCategory}
          onLogout={onLogout}
        />
      )}
      <div 
        style={{ height: isMobile ? '100%' : '90%' }}
      >
        {currentCategory === CategoryType.Activities && (
          <>
            <ActivitiesContainer />
          </>
        )}
        {currentCategory === CategoryType.Contacts && (
          <>
            <ContactsContainer />
          </>
        )}
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