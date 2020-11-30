import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider, IconButton } from '@material-ui/core';
import { BookIconLarge } from '@core/components/Icons/BookIcon';
import { SchoolIconLarge } from '@core/components/Icons/SchoolIcon';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import { SkillItemType } from '@skills/interfaces/SkillItem.interface';
// import SkillBook from '@skills/interfaces/SkillBook.interface';
// import SkillCourse from '@skills/interfaces/SkillCourse.interface';
import DialogTypes from '@skills/interfaces/DialogTypes.interface';
import { formatDateBasic } from '@core/utils/dateUtils';

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

interface Props {
  item: any; // TODO this should use SkillBook | SkillCourse but idk how to make it work yet
  type: 'active' | 'archive';
  onOpenDialog?: (type: DialogTypes) => () => void;
  setSelected?;
}

const SkillItem = ({ item, type, onOpenDialog, setSelected }: Props) => {
  const classes = useStyles();

  const { itemType, lastActivity } = item;

  const map = {
    [SkillItemType.Book]: {
      dialogType: DialogTypes.UpdateSkillBook,
      icon: <BookIconLarge />,
      info: type === 'active' ? 
        `Pages: ${item.pagesRead}/${item.pagesTotal}` : 
        `Finished ${formatDateBasic(lastActivity)}`
    },
    [SkillItemType.Course]: {
      dialogType: DialogTypes.UpdateSkillCourse,
      icon: <SchoolIconLarge />,
      info: type === 'active' ? 
        `Classes: ${item.classesDone}/${item.classesTotal}` : 
        `Finished ${formatDateBasic(lastActivity)}`
    }
  }

  const { dialogType, icon, info } = map[itemType];

  const handleOpenEdit = () => {
    setSelected(item);
    onOpenDialog(dialogType)();
  }

  return (
    <Paper className={classes.container}>
      <Grid container>
        <Grid item xs={2} className={classes.iconContainer}>
          {icon}
        </Grid>
        <Grid item xs={type === 'active' ? 8 : 10}>
          <Paper className={classes.itemInfo}>
            <Typography variant="subtitle1" className={classes.itemLine}>
              {item.name}
            </Typography>
            <Divider />
            <Typography variant="subtitle1" className={classes.itemLine}>
              {info}
            </Typography>
          </Paper>
        </Grid>
        {type === 'active' ? (
          <Grid item xs={2}>
            <IconButton className={classes.button} onClick={handleOpenEdit}>
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

