import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Button } from '@material-ui/core';
import downloadJSON from '@utils/downloadJSON';

const { useRef } = React;

const useStyles = makeStyles(theme => ({
  container: {}
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
    <Paper className={classes.container}>
      <Grid container>
        <Grid item>
          Filters: 
        </Grid>
        <Grid item>
          <Button disabled variant="outlined" color="primary">Skill</Button> 
        </Grid>
        <Grid item>
          <Button disabled variant="outlined" color="primary">Fitness</Button> 
        </Grid>
        <Grid item>
          <Button disabled variant="outlined" color="primary">Social</Button> 
        </Grid>
        <Grid item>
          Actions: 
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" onClick={toolBarHandlers.onOpenChooseCategory}>Add New</Button>
          <Button variant="outlined" color="primary" onClick={downloadJSON(store)}>DL Backup</Button>
          <Button variant="outlined" color="primary" onClick={upload}>UL Backup</Button>
        </Grid>
      </Grid>
      <a id="downloadData" style={{ display: 'none' }} />
      <input ref={inputRef} onChange={onUpload} type="file" id="uploadData" style={{ display: 'none' }} />
    </Paper>
  )
}

export default CategoryListToolbar;