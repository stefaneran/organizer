import Main from './main';

export default [
  {
    path: '/',
    title: 'Main Page',
    component: (store) => Main(store)
  }
]