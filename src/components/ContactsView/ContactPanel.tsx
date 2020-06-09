import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider, AppBar, Tabs, Tab, Button } from '@material-ui/core';
import InteractionLog from './InteractionLog';
import { formatDateClassic } from '@utils/dateUtils';

const { useState } = React;

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

const ContactPanel = ({ contact, openDialog }) => {
  const classes = useStyles();
  const { name, location, lastActivity, subgroups, relations, interactionHistory } = contact;
  const [currentTab, setCurrentTab] = useState(1);

  const handleTabChange = (event, tab) => {
    setCurrentTab(tab);
  }

  // TODO - Switch to clickable chips
  const subgroupsString = 
    subgroups.map((subgroup, index) => `${subgroup}${index < subgroups.length-1 ? ',' : ''} `);

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
            <Typography variant="subtitle1">Last Contact: {formatDateClassic(lastActivity)}</Typography>
          </Paper>
          <Paper className={classes.info}>
            <Typography variant="subtitle1">
              {subgroups.length ? `Subgroups: ${subgroupsString}` : 'No Subgroups'}
            </Typography>
            <Button color="primary" variant="outlined" onClick={openDialog('editSubgroups')}>
              {subgroups.length ? 'Edit' : 'Add'}
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
              {interactionHistory.map((log, index) => (
                <InteractionLog key={`${log.activityDate}-${index}`} log={log} />
              ))}
            </div>
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ContactPanel;