import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import ContentToolbar, { exportedStyles } from '@components/ContentToolbar';
import ContactsView from '@components/ContactsView';
import CreateContactDialog from '@components/Dialogs/CreateContactDialog';

const { useState } = React;

const useStyles = makeStyles((theme: Theme) => createStyles(exportedStyles));

const ContactsContainer = ({ store, toolBarHandlers }) => {
  const classes = useStyles();
  const { data: { contacts } } = store;
  const [createContactDialogOpen, setCreateContactDialogOpen] = useState(false);

  const handleCloseCreateContactDialog = () => {
    setCreateContactDialogOpen(false);
  }

  return (
    <>
      <Grid item xs={1} className={'gridRow'}>
        <ContentToolbar 
          store={store} 
          toolBarHandlers={toolBarHandlers} 
          specializedButtons={(
            <>
              <Grid item className={classes.buttonContainer}>
                <Button 
                  className={clsx(classes.button, classes.textButton)} 
                  onClick={() => setCreateContactDialogOpen(true)}
                  endIcon={<AddIcon className={classes.buttonIcon} />}
                >
                  Add Contact
                </Button>
              </Grid>
            </>
          )} 
        />
      </Grid>
      <Grid item xs={11} className={'gridRow'}>
        <ContactsView store={store} />
      </Grid>

      {/* Dialogs and Pop-Ups below this line  */}

      {createContactDialogOpen && (
        <CreateContactDialog
          isOpen={createContactDialogOpen} 
          onClose={handleCloseCreateContactDialog}
          contacts={contacts}
        />
      )}

    </>
  )
}

export default ContactsContainer;