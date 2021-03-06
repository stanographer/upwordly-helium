import React, { useEffect, useState } from 'react';
import './App.css';
import AppContext, { INITIAL_VALUES } from '../../context/appcontext';
import UrlForm from '../../components/SettingsForm';

const { ipcRenderer } = window.require('electron');

function App() {
  const [global, setGlobal] = useState({});

  useEffect(() => {
    try {
      ipcRenderer.send('getPrefs');
    } catch (err) {
      console.log('No prefs to get.');
    }
  }, []);

  ipcRenderer.on('returnedPrefs', (event, res) => {
    if (res) {
      setGlobal(res);
    } else {
      setGlobal(INITIAL_VALUES);
    }
  });

  const onChange = e => {
    if (e.target.name === 'url') {
      setGlobal({
        ...global,
        url: e.target.value.trim(),
      });
    }
    setGlobal({
      ...global,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    let user = '';

    try {
      user = global.url
        .trim()
        .split('?')[1]
        .split('&')[0]
        .split('=')[1];
    } catch (err) {
      throw setGlobal({ ...global, error: 'Invalid URL. Please try again.' });
    }

    let job = '';

    try {
      job = global.url
        .trim()
        .split('?')[1]
        .split('&')[1]
        .split('=')[1];
    } catch (err) {
      throw setGlobal({ ...global, error: 'Invalid URL. Please try again.' });
    }

    ipcRenderer.send('setPrefs', global);

    return {
      user,
      job,
      global,
    };
  };

  return (
    <AppContext.Provider value={global}>
      <div className="App">
        <header className="App-header">
          <p>Type in URL of Upword.ly link to begin.</p>
          <UrlForm onChange={onChange} onSubmit={onSubmit} />

          <p>{global.user}</p>
          <p>{global.job}</p>
          <p>{global.error}</p>
          <p>{global.url}</p>

        </header>
      </div>
    </AppContext.Provider>
  );
}

export default App;
