import Main from './main';

export default [
  {
    path: '/main',
    title: 'Main Page',
    component: (store) => Main(store)
  }
]