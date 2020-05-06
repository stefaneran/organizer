import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Divider, Tooltip, Button, IconButton } from '@material-ui/core';
import CategoryIcon from '@components/CategoryIcon';
import { 
  Add as AddIcon,
  Save as SaveIcon,
  Publish as PublishIcon
} from '@material-ui/icons';
import downloadJSON from '@utils/downloadJSON';
import { CategoryType } from '@interfaces/categories';

const { useRef } = React;

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative'
  },
  buttonContainer: {
    padding: '0.3em'
  },
  button: {
    padding: '0.2em'
  },
  buttonIcon: {
    width: '1.5em',
    height: '1.5em'
  },
  version: {
    position: 'absolute',
    right: '0.5em',
    top: '50%',
    transform: 'translateY(-50%)'
  }
}));

interface IToolBarProps {
  store: any;
  toolBarHandlers: {
    onOpenChooseCategory(): void;
  }
}

const CategoryListToolbar = ({ store, toolBarHandlers }: IToolBarProps) => {
  const classes = useStyles();

  const inputRef = useRef(null);

  const upload = () => {
    inputRef.current.click();
  }
  const onUpload = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const categories = JSON.parse(e.target.result); // TODO Deal with this typing
      store.loadBackupData({ categories });
      store.saveData();
    };
    reader.readAsText(event.target.files[0]); 
  }

  return (
    <Paper className={clsx(classes.container, 'theme-level-2')}>
      <Grid container>

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Filter By Skill">
            <IconButton className={classes.button}>
              <CategoryIcon categoryType={CategoryType.Skill} className={classes.buttonIcon} />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Filter By Social">
            <IconButton className={classes.button}>
              <CategoryIcon categoryType={CategoryType.Social} className={classes.buttonIcon} />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Filter By Fitness">
            <IconButton className={classes.button}>
              <CategoryIcon categoryType={CategoryType.Fitness} className={classes.buttonIcon} />
            </IconButton>
          </Tooltip>
        </Grid>

        <Divider orientation="vertical" flexItem />

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Add New Category">
            <IconButton className={classes.button} onClick={toolBarHandlers.onOpenChooseCategory}>
              <AddIcon className={classes.buttonIcon} />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Download Backup">
            <IconButton className={classes.button} onClick={downloadJSON(store)}>
              <SaveIcon className={classes.buttonIcon} />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item className={classes.buttonContainer}>
          <Tooltip title="Upload Backup">
            <IconButton className={classes.button} onClick={upload}>
              <PublishIcon className={classes.buttonIcon} />
            </IconButton>
          </Tooltip>
        </Grid>

        <span className={classes.version}>V{store.version}</span>

      </Grid>
      <a id="downloadData" style={{ display: 'none' }} />
      <input ref={inputRef} onChange={onUpload} type="file" id="uploadData" style={{ display: 'none' }} />
    </Paper>
  )
}

export default CategoryListToolbar;