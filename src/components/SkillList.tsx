import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import SkillThumbnail from '@components/SkillThumbnail';
import EmptyThumbnail from '@components/EmptyThumbnail';
import { Skill } from '@interfaces/skill/Skill.interface';

const useStyles = makeStyles(theme => ({
  thumbnail: {
    cursor: 'pointer'
  }
}));

interface SkillListProps {
  skills: Skill[];
  onThumbClick(skill?): () => void;
  globalDialogActions: any;
}

const SkillList = ({ skills = [], onThumbClick, globalDialogActions }: SkillListProps) => {
  const classes = useStyles();

  return (
    <Grid 
      data-selector="skills-list"
      container 
      spacing={2}
    >
      {skills.length ? (
        <>
          {skills.map((skill, index) => (
            <Grid 
              key={`${skill.title}-${index}`} 
              className={classes.thumbnail} 
              item xs={4} lg={3}
              onClick={onThumbClick(skill)}
            >
              <SkillThumbnail skill={skill} globalDialogActions={globalDialogActions} />
            </Grid>
          ))}
          {skills.length < 3 && (
            <Grid 
              className={classes.thumbnail} 
              item xs={4} lg={3}
              onClick={onThumbClick()}
            >
              <EmptyThumbnail />
            </Grid>
          )}
        </>
      ) : (
        <Grid 
          className={classes.thumbnail} 
          item xs={4} lg={3}
          onClick={onThumbClick()}
        >
          <EmptyThumbnail />
        </Grid>
      )}
    </Grid>
  )
}

export default SkillList;