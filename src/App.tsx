import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './pages';
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
        <Router>
          <Switch>
          {routes.map(route => (
            <Route key={route.path} path={route.path}>
              {route.component(props)}
            </Route>
          ))}
          </Switch>
          <Route path="/">
            <div> Welcome to the Homepage! </div>
          </Route>
        </Router>
      )}
    </>
  );
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);