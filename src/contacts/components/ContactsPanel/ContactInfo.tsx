import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { PeopleIconMediumInfo } from '@core/components/Icons/PeopleIcon';
import ContactInfoEdit from '@contacts/components/ContactsPanel/ContactInfoEdit';
import GenderChip from '@contacts/components/ContactsPanel/GenderChip';
import RelationshipChip from '@contacts/components/ContactsPanel/RelationshipChip';
import OneOnOneChip from '@contacts/components/ContactsPanel/OneOnOneChip';
import Chips from '@contacts/components/Chips';
import { Contact } from '@contacts/types.d';

const useStyles = makeStyles((theme: Theme) => createStyles({
  sidepanel: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    transition: 'right 300ms',
    background: '#ecedf0',
    padding: '1em'
  },
  headline: {
    position: 'absolute',
    top: '0.5em',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  topButtons: {
    textAlign: 'right'
  },
  infoContainer: {
    textAlign: 'left'
  },
  infoGroup: {
    display: 'flex',
    marginTop: '1em'
  },
  locationIcon: {
    height: '1em',
    width: '1em',
    position: 'relative',
    top: '0.15em',
    marginRight: '0.4em'
  }
}));

interface Props {
  contact: Contact;
  contactId: string;
  groups: string[];
  isOpen: boolean;
  onClose: () => void;
  actions;
  onDeleteContact: () => void;
}

const ContactInfo: React.FC<Props> = ({ 
  contact,
  contactId,
  groups,
  isOpen,
  onClose,
  actions,
  onDeleteContact
 }) => {
  const classes = useStyles();
  const isCreate = !Boolean(contactId);

  const [isEdit, setIsEdit] = React.useState(isCreate);

  React.useEffect(() => {
    if (isCreate) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [contactId])

  const toggleEdit = () => setIsEdit(!isEdit);
  const handleClose = () => onClose();

  return (
    <div className={classes.sidepanel} style={{ right: isOpen ? '0%' : '-100%' }}>
      {isOpen ? (
        <>
          <div className={classes.topButtons}>
            {!isCreate ? (
              <IconButton onClick={toggleEdit}>
                <EditIcon />
              </IconButton>
            ) : null}
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          {isEdit ? (
            <ContactInfoEdit 
              contact={contact}
              contactId={contactId}
              groups={groups}
              onClose={handleClose}
              toggleEdit={toggleEdit}
              createContact={actions.createContact}
              editContact={actions.editContact}
              onDeleteContact={onDeleteContact}
            />
          ) : (
            <>
              <Typography variant="h4" className={classes.headline}>
                {contact?.name}
              </Typography>
              <div className={classes.infoContainer}>

                <div className={classes.infoGroup} style={{ justifyContent: 'center' }}>
                  <GenderChip gender={contact?.gender} />
                  <RelationshipChip relationshipStatus={contact?.relationshipStatus} />
                  <OneOnOneChip oneOnOne={contact?.oneOnOne} />
                </div>

                <div className={classes.infoGroup}>
                  <LocationOnIcon className={classes.locationIcon} />
                  <Typography variant="h5">{contact?.location}</Typography>
                </div>

                <div className={classes.infoGroup}>
                  <PeopleIconMediumInfo />
                  <Chips 
                    memo={() => contact?.groups ?? []}
                    deps={[contact?.groups]}
                    getKey={(group) => group}
                    getLabel={(group) => group}
                  />
                </div>

              </div>
            </>
          )}
        </>
      ) : null}
    </div>
  )
}

export default ContactInfo;