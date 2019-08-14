import React from 'react';

const AppContext = React.createContext({
  error: '',
  backgroundColor: 'transparent',
  color: '#fffce1',
  fontFamily: 'Cousine',
  fontSize: '50px',
  textBg: 'rgb(30,34,39)',
  url: 'https://upword.ly/editor?user=stan&job=testingncra',
  user: '',
});

export default AppContext;
