import React from 'react';
import AppContext from '../../context/appcontext';

const { ipcRenderer } = window.require('electron');

const UrlForm = ({ onChange, onSubmit }) => {
  return (
    <AppContext.Consumer>
      {context => {
        console.log('context', context.user);
        return (
          <form
            onSubmit={e =>
              onSubmit(e).then(res => {
                ipcRenderer.send('start', res);
              })
            }
          >
            <input
              name="url"
              type="text"
              value={context.url || ''}
              onChange={e => onChange(e)}
            />
            <button name="submit" type="submit">
              Connect
            </button>
          </form>
        );
      }}
    </AppContext.Consumer>
  );
};

export default UrlForm;