import * as React from 'react';
import { connect } from 'react-redux';
import MainPage from './pages/main';
import './styles.scss';
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';

const { log } = console;
const { useState, useEffect } = React;

const App = (props) => {

  const [isDataValidated, setValidated] = useState(false);
  const [isActivityUpdated, setActivityUpdated] = useState(false);

  log('=== INFO: Store in App ===\n', props);

  // load data from local storage
  useEffect(() => {
    const { loadData } = props;
    loadData();
  }, []);

  // Validate for any missing properties due to changes
  useEffect(() => {
    const { validateData, updateActivity, saveData, profiles, currentProfile } = props;
    const { categories } = profiles[currentProfile];
    // Only run after loadData is done
    if(!isDataValidated && categories.length) {
      validateData();
      setValidated(true);
      saveData();
    }
    // Run after data is loaded and validated
    if(!isActivityUpdated && isDataValidated) {
      updateActivity();
      setActivityUpdated(true);
    }
  }, [props, isDataValidated]);

  const { error } = props;

  return (
    <>
      {error ? (
        <p> There is an error </p>
      ) : (
        <MainPage store={props} />
      )}
    </>
  );
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);