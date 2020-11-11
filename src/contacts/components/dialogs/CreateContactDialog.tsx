import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { GenericDialog } from '@core/components/GenericDialog';
import TextMultiSelect from '@core/components/FormInputs/TextMultiSelect';
import TextInput from '@core/components/FormInputs/TextInput';
import SelectInput from '@core/components/FormInputs/SelectInput';
import { getDefaultFormData } from '@core/utils/formDataUtils';
import createContactData from '@core/schemas/inputDialogs/createContactData';
import Contact from '@contacts/interfaces/Contact.interface';

interface CreateContactProps {
  isOpen: boolean;
  onClose: any;
  contacts: Contact[];
  groups: string[];
}

const useStyles = makeStyles(theme => ({
  input: {
    // margin: '1em'
  }
}));

const CreateContactDialog = ({ isOpen, onClose, contacts, groups }: CreateContactProps) => {
  const classes = useStyles();
  const formModel = createContactData;
  
  // Inject options since they cannot be declared statically in the schema
  const groupsOptions = 
    groups.map(group => ({ 
      label: group, 
      value: group 
    }));

  // All other contacts as options
  const relationsOptions = 
    Object.keys(contacts).map(contactId => ({ 
      label: contacts[contactId].name, 
      value: contacts[contactId].name 
    }));

  const [formData, setFormData] = React.useState(getDefaultFormData(formModel));

  const handleChange = (inputName, inputValue) => {
    setFormData({ ...formData, [inputName]: inputValue });
  }

  const handleClose = (options?) => () => {
    let isSubmit = options ? options.isSubmit : false;
    const parsedForm = {
      ...formData,
      groups: formData.groups.map(group => group.value),
      relations: formData.relations.map(relation => relation.value)
    }
    onClose({ isSubmit, formData: parsedForm });
  }

  return (
    <GenericDialog
      isOpen={isOpen} 
      title={"Create a Contact"}
      onClose={handleClose}
      actionsType={'simpleForm'}
      maxWidth={'none'}
    >
      <Grid container spacing={2}>
        <Grid container item direction="column" xs={4}>
          <Grid item className={classes.input}>
            <TextInput 
              name={formModel.data.name.name} 
              label={formModel.data.name.label} 
              handleChange={handleChange} 
              inputValue={formData.name}
            />
          </Grid>
          <Grid item className={classes.input}>
            <TextInput 
              name={formModel.data.location.name} 
              label={formModel.data.location.label} 
              handleChange={handleChange} 
              helperText={formModel.data.location.helperText} 
              inputValue={formData.location}
            />
          </Grid>
          <Grid item className={classes.input}>
            <SelectInput
              name={formModel.data.priority.name}
              label={formModel.data.priority.label}
              inputValue={formData.priority}
              handleChange={handleChange}
              options={formModel.data.priority.options}
            />
          </Grid>
        </Grid>
        <Grid item className={classes.input} xs={4} style={{ paddingTop: '0.8em' }}>
          <TextMultiSelect 
            name={formModel.data.groups.name} 
            label={formModel.data.groups.label} 
            options={groupsOptions}
            handleChange={handleChange} 
            multiple={true}
            canAdd={true}
            helperText={formModel.data.groups.helperText}
            size="small"
          />
        </Grid>
        <Grid item className={classes.input} xs={4} style={{ paddingTop: '0.8em' }}>
          <TextMultiSelect 
            name={formModel.data.relations.name} 
            label={formModel.data.relations.label} 
            options={relationsOptions}
            handleChange={handleChange}
            multiple={true}
            helperText={formModel.data.relations.helperText}
            size="small"
          />
        </Grid>
      </Grid>
    </GenericDialog>
  );
}

export default CreateContactDialog;