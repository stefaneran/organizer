interface AppStore {
  version: string;
  loading: boolean;
  error: {
    active: boolean;
    message: string;
  };
  user: {
    loggedIn: boolean;
    userName: string;
    password: string;
  };
}

export default AppStore;