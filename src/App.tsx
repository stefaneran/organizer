import * as React from 'react';
import { connect } from 'react-redux';
import { load } from './store/reducer';

interface IProps {
  load(): void;
}

const App = (props: IProps) => {

  React.useEffect(() => {
    props.load();

    return () => null;
  }, [])

  return (
    <>
      Hello World!
    </>
  );
  
}

const mapStateToProps = state => ({
  categories: state.categories
});

const mapDispatchToProp = {
  load
}

export default connect(
  mapStateToProps, 
  mapDispatchToProp
)(App);