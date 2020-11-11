import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import SkillThumbnail from '@skills/components/SkillThumbnail';
import EmptyThumbnail from '@skills/components/EmptyThumbnail';
import SkillsStore from '@skills/interfaces/SkillsStore.interface';
import { Skill } from '@skills/interfaces/Skill.interface';
import DialogTypes from '@skills/interfaces/DialogTypes.interface';

const useStyles = makeStyles(theme => ({
  thumbnail: {
    cursor: 'pointer'
  }
}));

interface SkillListProps {
  skills: SkillsStore;
  onThumbClick: (skillId?: string) => () => void;
  onOpenDialog: (type: DialogTypes) => () => void;
}

const SkillList = ({ skills = {}, onThumbClick, onOpenDialog }: SkillListProps) => {
  const classes = useStyles();

  const hasSkills = Boolean(Object.keys(skills).length);

  return (
    <Grid container spacing={2}>
      {hasSkills ? (
        <>
          {Object.keys(skills).map(skillId => (
            <Grid 
              key={skillId} 
              className={classes.thumbnail} 
              item xs={4} lg={3}
              onClick={onThumbClick(skillId)}
            >
              <SkillThumbnail skill={skills[skillId]} onOpenDialog={onOpenDialog} />
            </Grid>
          ))}
          {Object.keys(skills).length < 3 && (
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