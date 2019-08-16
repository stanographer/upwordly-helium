import React from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/appcontext';

const { ipcRenderer } = window.require('electron');

const UrlForm = ({ onChange, onSubmit }) => {
  return (
    <AppContext.Consumer>
      {context => {
        return (
          <form
            onSubmit={e =>
              onSubmit(e)
                .then(res => {
                  ipcRenderer.send('start', { ...res, context });
                })
                .catch(err => console.error(err))
            }
          >
            <label htmlFor="url">Upword.ly URL</label>
            <input
              id="url"
              name="url"
              type="text"
              value={context.url || ''}
              onChange={e => onChange(e)}
            />
            {/*<label htmlFor="backgroundColor">Window Background</label>*/}
            {/*<input*/}
            {/*  id="backgroundColor"*/}
            {/*  name="backgroundColor"*/}
            {/*  type="text"*/}
            {/*  value={context.backgroundColor || ''}*/}
            {/*  onChange={e => onChange(e)}*/}
            {/*/>*/}
            <label htmlFor="textBg">Text Background</label>
            <input
              id="textBg"
              name="textBg"
              type="text"
              value={context.textBg || ''}
              onChange={e => onChange(e)}
            />
            <label htmlFor="fontSize">Text Color</label>
            <input
              id="color"
              name="color"
              type="text"
              value={context.color || ''}
              onChange={e => onChange(e)}
            />
            <label htmlFor="fontSize">Text Size (pt)</label>
            <input
              id="fontSize"
              name="fontSize"
              type="text"
              value={context.fontSize || ''}
              onChange={e => onChange(e)}
            />
            <label htmlFor="fontSize">Text Outline Color</label>
            <input
              id="textOutlineColor"
              name="textOutlineColor"
              type="text"
              value={context.textOutlineColor || ''}
              onChange={e => onChange(e)}
            />
            <label htmlFor="fontSize">Text Outline Width</label>
            <input
              id="textOutlineWidth"
              name="textOutlineWidth"
              type="text"
              value={context.textOutlineWidth || ''}
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
