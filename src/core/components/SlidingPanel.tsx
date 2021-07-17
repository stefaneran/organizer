import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: '0',
    display: 'flex'
  },
  clickArea: {
    height: '100%'
  },
  sidepanel: {
    height: '100%',
    background: '#ecedf0',
    padding: '0 2em 0 2em'
  },
  topButtons: {
    textAlign: 'right'
  }
})); 

interface Props {
  isOpen: boolean;
  onClose: () => void;
  width: number;
  direction: 'left' | 'right';
}

const SlidingPanel: React.FC<Props> = ({
  isOpen,
  onClose,
  width,
  direction,
  children
 }) => {
  const classes = useStyles();

  const containerStyle = {
    transition: `${direction} 300ms`,
    [direction]: isOpen ? '0%' : `-100%`,
  }
  const panelStyle = {
    width: `${width}%`
  }
  const clickAreaStyle = {
    width: `${Math.abs(width - 100)}%`
  }

  return (
    <div className={classes.container} style={containerStyle}>
      {direction === 'right' ? (
        <div className={classes.clickArea} style={clickAreaStyle} onClick={onClose} />
      ) : null}
      <div className={classes.sidepanel} style={panelStyle}>
        <div className={classes.topButtons}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {children}
      </div>
      {direction === 'left' ? (
        <div className={classes.clickArea} style={clickAreaStyle} onClick={onClose} />
      ) : null}
    </div>
  )
}

export default SlidingPanel;