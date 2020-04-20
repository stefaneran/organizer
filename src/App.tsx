import * as React from 'react';
import { connect } from 'react-redux';
import MainPage from './pages/main';
import './styles.scss';
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';

const { log } = console;
const { useEffect } = React;

const App = (props) => {

  log('INFO: Store in App: ', props);

  useEffect(() => {
    props.loadData()
  }, []);

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