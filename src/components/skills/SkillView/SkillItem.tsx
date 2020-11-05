import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider, IconButton } from '@material-ui/core';
import { BookIconLarge } from '@components/core/Icons/BookIcon';
import { SchoolIconLarge } from '@components/core/Icons/SchoolIcon';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import { SkillItemType } from '@interfaces/skill/SkillItem.interface';
import { formatDateBasic } from '@utils/dateUtils';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    padding: '0.5em 0.5em 0.5em 0',
    backgroundColor: theme.palette.primary.main,
    marginBottom: '1em'
  },
  iconContainer: {
    '& > svg': {
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  },
  itemInfo: {
    padding: '0.2em'
  },
  itemLine: {
    padding: '0.1em 0.5em'
  },
  button: {
    height: '1.4em',
    padding: '0.2em',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    '&:hover': {
      background: 'rgba(255,255,255,0.2)'
    }
  }
}));

const SkillItem = ({ item, type, openDialog }) => {
  const classes = useStyles();

  const { itemType, lastActivity } = item;

  const map = {
    [SkillItemType.Book]: {
      clickHandler: 'updateBook',
      icon: <BookIconLarge />,
      info: type === 'active' ? 
        `Pages: ${item.pagesRead}/${item.pagesTotal}` : 
        `Finished ${formatDateBasic(lastActivity)}`
    },
    [SkillItemType.Course]: {
      clickHandler: 'updateCourse',
      icon: <SchoolIconLarge />,
      info: type === 'active' ? 
        `Classes: ${item.classesDone}/${item.classesTotal}` : 
        `Finished ${formatDateBasic(lastActivity)}`
    }
  }

  const { clickHandler, icon, info } = map[itemType];

  return (
    <Paper className={classes.container}>
      <Grid container>
        <Grid item xs={2} className={classes.iconContainer}>
          {icon}
        </Grid>
        <Grid item xs={type === 'active' ? 8 : 10}>
          <Paper className={classes.itemInfo}>
            <Typography variant="subtitle1" className={classes.itemLine}>
              {item.title}
            </Typography>
            <Divider />
            <Typography variant="subtitle1" className={classes.itemLine}>
              {info}
            </Typography>
          </Paper>
        </Grid>
        {type === 'active' ? (
          <Grid item xs={2}>
            <IconButton className={classes.button} onClick={openDialog({ type: clickHandler, data: item })}>
              <UpdateIcon style={{ color: '#fff' }} />
            </IconButton>
            <IconButton className={classes.button} onClick={() => {/** TODO - Delete Item */}} disabled>
              <DeleteIcon style={{ color: '#fff' }} />
            </IconButton>
          </Grid>
        ) : null}
      </Grid>
    </Paper>
  )
}

export default SkillItem;

