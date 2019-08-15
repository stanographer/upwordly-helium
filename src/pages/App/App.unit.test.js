import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

// Creates component and passes props.
const setup = (props = {}) => {
  return shallow(<App {...props} />);
};

describe('App Component', () => {
  it('should render correctly in debug mode.', () => {
    window.require = require;
    const component = shallow(<App debug />);
    expect(component).toMatchInlineSnapshot(`
      <ContextProvider
        value={Object {}}
      >
        <div
          className="App"
        >
          <header
            className="App-header"
          >
            <p>
              Type in URL of Upword.ly link to begin.
            </p>
            <UrlForm
              onChange={[Function]}
              onSubmit={[Function]}
            />
            <p />
            <p />
            <p />
            <p />
          </header>
        </div>
      </ContextProvider>
    `);
  });
});
