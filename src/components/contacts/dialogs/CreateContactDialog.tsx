import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { GenericDialog } from '@components/core/GenericDialog';
import TextMultiSelect from '@components/core/FormInputs/TextMultiSelect';
import TextInput from '@components/core/FormInputs/TextInput';
import SelectInput from '@components/core/FormInputs/SelectInput';
import { getDefaultFormData } from '@utils/formDataUtils';
import getSubgroupsFromContacts from '@utils/getSubgroupsFromContacts'
import createContactData from '@schemas/inputDialogs/createContactData';
import Contact from '@interfaces/contacts/Contact.interface';

const { useState } = React;

interface CreateContactProps {
  isOpen: boolean;
  onClose: any;
  contacts: Contact[];
}

const useStyles = makeStyles(theme => ({
  input: {
    // margin: '1em'
  }
}));

const CreateContactDialog = ({ isOpen, onClose, contacts }: CreateContactProps) => {
  const classes = useStyles();
  const formModel = createContactData;

  // Inject options since they cannot be declared statically in the schema
  const subgroupsOptions = 
    getSubgroupsFromContacts(contacts)
    .map(subgroup => ({ label: subgroup, value: subgroup }));

  const relationsOptions = 
    contacts.map(contact => ({ label: contact.name, value: contact.name }));

  const [formData, setFormData] = useState(getDefaultFormData(formModel));

  const handleChange = (inputName, inputValue) => {
    setFormData({ ...formData, [inputName]: inputValue });
  }

  const handleClose = (options?) => () => {
    let isSubmit = options ? options.isSubmit : false;
    const parsedForm = {
      ...formData,
      subgroups: formData.subgroups.map(subgroup => subgroup.value),
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
            name={formModel.data.subgroups.name} 
            label={formModel.data.subgroups.label} 
            options={subgroupsOptions}
            handleChange={handleChange} 
            multiple={true}
            canAdd={true}
            helperText={formModel.data.subgroups.helperText}
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