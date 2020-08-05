
export default state => ({
  data: state.data,
  user: state.user,
  // TODO Enable and fix problems
  // error: state.error,
  loading: state.loading,
  version: state.version
});