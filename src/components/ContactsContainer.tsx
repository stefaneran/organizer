import * as React from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import ContentToolbar from '@components/ContentToolbar';
import ContactsView from '@components/ContactsView';

const ContactsContainer = ({ store, toolBarHandlers }) => {

  const contactsToolBarHandlers = {
    ...toolBarHandlers
  }

  return (
    <>
      <Grid item xs={1} className={'gridRow'}>
        <ContentToolbar store={store} toolBarHandlers={contactsToolBarHandlers} />
      </Grid>
      <Grid item xs={11} className={'gridRow'}>
        <ContactsView store={store} />
      </Grid>
    </>
  )
}

export default ContactsContainer;