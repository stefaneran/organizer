import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from 'app/components/AppBar';
import AppBarMobile from 'app/components/AppBarMobile';
import ActivitiesContainer from 'activities/container/ActivitiesContainer';
import ActivitiesMobileContainer from 'activities/mobile/container/ActivitiesMobileContainer';
import ContactsContainer from 'contacts/container/ContactsContainer';
import ContactsMobileContainer from 'contacts/mobile/container/ContactsMobileContainer';
import InventoryContainer from 'inventory/container/InventoryContainer';
import InventoryMobileContainer from 'inventory/mobile/container/InventoryMobileContainer';
import RecipesContainer from 'recipes/container/RecipesContainer';
import RecipesMobileContainer from 'recipes/mobile/container/RecipesMobileContainer';
import defaultWebApp from '@core/defaultWebApp';
import { OrganizerModule, AppStore } from '@core/types';

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    width: '100%'
  }
})); 

interface Props {
  app: AppStore["app"];
  setLoginDialog: (props: { type: string; isOpen: boolean; }) => () => void;
  onLogout: () => void;
}

const ContentView: React.FC<Props> = ({ app, setLoginDialog, onLogout }) => {
  const classes = useStyles();
  const { isMobile } = app;
  const [currentModule, setCurrentModule] = React.useState(defaultWebApp);
  return (
    <div 
      style={{ padding: isMobile ? '' : '0.8em' }}
      className={classes.container}
    >
      {isMobile ? (
        <AppBarMobile 
          app={app}
          setLoginDialog={setLoginDialog}
          setCurrentModule={setCurrentModule}
          onLogout={onLogout}
        />
      ) : (
        <AppBar
          app={app}
          setLoginDialog={setLoginDialog}
          setCurrentModule={setCurrentModule}
          onLogout={onLogout}
        />
      )}
      <div 
        style={{ height: isMobile ? '100%' : '90%' }}
      >
        {currentModule === OrganizerModule.Activities && (
          <>
          {isMobile ? (
            <ActivitiesMobileContainer />
          ) : (
            <ActivitiesContainer />
          )}
          </>
        )}
        {currentModule === OrganizerModule.Contacts && (
          <>
          {isMobile ? (
            <ContactsMobileContainer />
          ) : (
            <ContactsContainer />
          )}
          </>
        )}
        {currentModule === OrganizerModule.Inventory && (
          <>
          {isMobile ? (
            <InventoryMobileContainer />
          ) : (
            <InventoryContainer />
          )}
          </>
        )}
        {currentModule === OrganizerModule.Recipes && (
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