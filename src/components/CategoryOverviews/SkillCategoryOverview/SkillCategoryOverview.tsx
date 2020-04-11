import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid, 
  LinearProgress,
} from '@material-ui/core';
import GeneralInfo from './GeneralInfo';
import TopActivity from './TopActivity';
import Actions from './Actions';

const useStyles = makeStyles(theme => ({
  overview: {

  },
  properties: {
    width: '100%'
  }
}));

const SkillCategoryOverview = () => {
  const classes = useStyles();
  return (
    <Grid container item xs={11}>
      <Grid data-selector="overview" xs={8} container item>
        <Grid data-selector="progression" xs={3} container item direction="column">
          <Grid data-selector="progress-bars" container item>

            <Grid data-selector="progress-bar-hours" item>
              <LinearProgress variant="determinate" value={20} color="primary" />
            </Grid>

            <Grid data-selector="progress-bar-xp" item >
              <LinearProgress variant="determinate" value={80} color="secondary" />
            </Grid>

          </Grid>

          <Grid data-selector="progress-info" container item>
            <p>Next level: {'Professional'}</p>
          </Grid>

        </Grid>
        <Grid data-selector="info" xs={9} container item direction="column">

          <Grid data-selector="skill-properties" className={classes.properties} xs={5} container item direction="column">
            <GeneralInfo />
          </Grid>
          
          <Grid data-selector="top-activity" xs={5} container item direction="column">
            <TopActivity />
          </Grid>

          <Grid data-selector="skill-actions" xs={2} container item>
            <Actions />
          </Grid>

        </Grid>
      </Grid>
      <Grid data-selector="skill-items" xs={4} container item>

      </Grid>
    </Grid>
  )
}

export default SkillCategoryOverview;