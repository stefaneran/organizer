export const getDefaultFieldValue = (type) => {
  const map = {
    text: '',
    number: 0,
    checkbox: false,
    select: ''
  };
  return map[type];
}

// Populate state hook object with fieldName/value key pairs
export const getDefaultFormData = (form) => {
  const defaultFormData = {};
  for(const fieldName in form.data) {
    const { type, defaultValue } = form.data[fieldName];
    defaultFormData[fieldName] = defaultValue ? defaultValue : getDefaultFieldValue(type);
  }
  return defaultFormData;
}

//// Wizard-Specific

// Get form data for specific wizard steps
export const getStepFormData = (wizardForm, index, formData) => 
  wizardForm.steps[index].fields.map(fieldName => ({ 
    ...wizardForm.data[fieldName], 
    inputValue: formData[fieldName]
  }));