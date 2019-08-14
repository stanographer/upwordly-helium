import React from 'react';
import PropTypes from 'prop-types';
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
              onSubmit(e)
                .then(res => {
                  console.log(res);
                  ipcRenderer.send('start', res);
                })
                .catch(err => console.error(err))
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

UrlForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UrlForm;
