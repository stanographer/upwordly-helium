import React from 'react';

export const INITIAL_VALUES = {
  error: '',
  backgroundColor: 'transparent',
  color: '#fffce1',
  fontFamily: 'Cousine',
  fontSize: 50,
  textBg: 'rgb(30,34,39)',
  textOutlineColor: '#000',
  textOutlineWidth: '1px',
  url: 'https://upword.ly/editor?user=stan&job=testingncra',
  user: '',
};

const AppContext = React.createContext(INITIAL_VALUES);

export default AppContext;
