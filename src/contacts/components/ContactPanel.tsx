import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider, AppBar, Tabs, Tab, Button } from '@material-ui/core';
import InteractionLog from './InteractionLog';
import DialogTypes from '@contacts/interfaces/DialogTypes.interface';
import { formatDateClassic } from '@core/utils/dateUtils';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    backgroundColor: theme.palette.primary.main,
    padding: '1em'
  },
  info: {
    padding: '0.2em 0.5em',
    marginBottom: '0.5em'
  },
  bar: {
    background: '#fff',
    color: theme.palette.primary.main
  },
  tab: {
    minWidth: 'auto',
    flexGrow: 1
  },
  historyContainer: {
    background: '#fff',
    padding: '1em',
    maxHeight: '300px',
    overflowY: 'auto'
  },
}));

const ContactPanel = ({ contact, onOpenDialog }) => {
  const classes = useStyles();
  const { name, location, lastInteraction, groups, relations, hangouts } = contact;
  const [currentTab, setCurrentTab] = React.useState(1);

  const handleTabChange = (event, tab) => setCurrentTab(tab)

  // TODO - Switch to clickable chips
  const groupsString = 
    groups.map((group, index) => `${group}${index < groups.length-1 ? ',' : ''} `);

  const relationsString = 
    relations.map(relation => <Typography key={relation} variant="subtitle1">- {relation}</Typography>);

  return (
    <Paper className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Paper className={classes.info}>
            <Typography variant="subtitle1">{name}</Typography>
            <Divider />
            <Typography variant="subtitle1">{location}</Typography>
            <Divider />
            <Typography variant="subtitle1">Last Contact: {formatDateClassic(lastInteraction)}</Typography>
          </Paper>
          <Paper className={classes.info}>
            <Typography variant="subtitle1">
              {groups.length ? `groups: ${groupsString}` : 'No groups'}
            </Typography>
            <Button color="primary" variant="outlined" onClick={onOpenDialog(DialogTypes.EditGroups)}>
              {groups.length ? 'Edit' : 'Add'}
            </Button>
          </Paper>
          {relations.length ? (
            <Paper className={classes.info}>
              <Typography variant="subtitle1">
                Relations: {relationsString}
              </Typography>
            </Paper>
          ) : null}
        </Grid>
        <Grid item xs={8}>
          <AppBar position="static" className={classes.bar}>
            <Tabs value={currentTab} onChange={handleTabChange}>
              <Tab className={classes.tab} label="Bio" />
              <Tab className={classes.tab} label="History" />
            </Tabs>
          </AppBar>
          {currentTab === 0 ? (
            <div>Bio</div>
          ) : (
            <div className={classes.historyContainer}>
              {hangouts.slice().sort((a, b) => b - a).map(hangoutDate => (
                <InteractionLog key={`${hangoutDate}`} hangoutDate={hangoutDate} />
              ))}
            </div>
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ContactPanel;