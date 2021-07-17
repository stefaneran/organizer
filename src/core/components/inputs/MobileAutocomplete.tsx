import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TextField, Typography, Divider, IconButton } from '@material-ui/core'; 
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => createStyles({
  container: {
    position: 'relative'
  },
  input: {
    '& label': {
      fontSize: '3rem'
    },
    '& > div': {
      fontSize: '3rem'
    }
  },
  clear: {
    position: 'absolute',
    top: '50%',
    right: '0.5em',
    transform: 'translateY(-50%)',
    '& svg': {
      width: '2em',
      height: '2em'
    }
  },
  popover: {
    position: 'absolute',
    width: '100%',
    background: '#fff',
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    zIndex: 1
  },
  option: {
    padding: '0.5em 1em'
  },
  optionText: {
    fontSize: '3rem'
  }
}))

interface Props {
  className?;
  options;
  onChange;
  getOptionLabel;
  label?;
  placeholder?;
  fullWidth?;
}

const filterOptions = (options, textValue, getOptionLabel) => {
  const filteredOptions = [];
  options.forEach(option => {
    const optionLabel = getOptionLabel(option);
    if (optionLabel.toLowerCase().includes(textValue.toLowerCase())) {
      filteredOptions.push(option);
    }
  })
  return filteredOptions;
}

const MobileAutocomplete = ({ 
  className,
  options,
  onChange,
  getOptionLabel,
  placeholder,
  fullWidth
}: Props) => {
  const classes = useStyles();

  const [textValue, setTextValue] = React.useState(null);
  const [filteredOptions, setFilteredOptions] = React.useState([]);

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (textValue !== null) {
      setFilteredOptions(filterOptions(options, textValue, getOptionLabel));
    }
  }, [textValue])

  const handleOnFocus = () => {
    setTextValue('');
    setFilteredOptions(filterOptions(options, textValue, getOptionLabel));
  }
  const handleTextInput = (event) => {
    setTextValue(event.target.value);
  }
  const handleClear = () => {
    setTextValue(null);
    setFilteredOptions([]);
  }
  const handleSelect = (option) => () => {
    onChange(option);
    setTextValue(null);
    setFilteredOptions([]);
  }

  return (
    <div
      className={className ? clsx(className, classes.container) : classes.container}
      style={{ width: fullWidth ? '100%' : '' }}
    >
      <TextField 
        ref={inputRef}
        className={classes.input}
        onFocus={handleOnFocus}
        value={textValue ? textValue : ''}
        onChange={handleTextInput}
        variant="outlined"
        color="primary"
        size="medium"
        placeholder={placeholder}
        fullWidth
      />
      {filteredOptions.length ? (
        <>
          <IconButton 
            className={classes.clear} 
            onClick={handleClear}
          >
            <CloseIcon />
          </IconButton>
          <div id="test" className={classes.popover}>
            {filteredOptions.map((option, index) => {
              const optionLabel = getOptionLabel(option);
              return index < 6 ? (
                <div 
                  key={optionLabel}
                  className={classes.option} 
                  onClick={handleSelect(option)}
                >
                  <Typography className={classes.optionText} variant="subtitle1">
                    {optionLabel}
                  </Typography>
                  {index < 6 && (index + 1) < filteredOptions.length ? <Divider variant="fullWidth" /> : null}
                </div>
              ) : null;
            })}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default MobileAutocomplete;