import * as React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import ContentView from '@components/ContentView';
import HistoryView from '@components/HistoryView';

const { log } = console;
const { useState, useEffect } = React;

const App = (store) => {
  const [isDataValidated, setValidated] = useState(false);
  const [isActivityUpdated, setActivityUpdated] = useState(false);

  log('=== INFO: Store in App ===\n', store);

  // load data from local storage
  useEffect(() => {
    const { loadData } = store;
    loadData();
  }, []);

  // Validate for any missing properties due to changes
  useEffect(() => {
    const { validateData, updateActivity, saveData, data } = store;
    const { skills } = data;
    // Only run after loadData is done
    if(!isDataValidated && skills.length) {
      validateData();
      setValidated(true);
      saveData();
    }
    // Run after data is loaded and validated
    if(!isActivityUpdated && isDataValidated) {
      updateActivity();
      setActivityUpdated(true);
    }
  }, [store, isDataValidated]);

  const { error } = store;

  return (
    <>
      {error ? (
        <p> There was a critical error </p>
      ) : (
        <div className="appContainer">
          <ContentView store={store} />
        </div>
      )}
    </>
  );
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);