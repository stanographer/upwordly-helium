import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

require('dotenv').config();

// Mock window.require.
global.window.require = function() {
  return {
    ipcRenderer: {
      send: function() {
        // Fake sending message to ipcMain
      },
    },
  };
};

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true,
});
