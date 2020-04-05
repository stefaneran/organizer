import * as React from 'react';
import { connect } from 'react-redux';
import { addCategory } from './store/reducer';
import MainPage from './MainPage';
import './styles.scss';

interface IProps {
  addCategory(): void;
}

const App = (props: IProps) => {

  React.useEffect(() => {
    // loadFromLocalStorage
    return () => null;
  }, [])

  return (
    <MainPage store={props} />
  );
}

const mapStateToProps = state => ({
  profiles: state.profiles,
  currentProfile: state.currentProfile,
  loading: state.loading
});

const mapDispatchToProp = {
  addCategory
}

export default connect(
  mapStateToProps, 
  mapDispatchToProp
)(App);