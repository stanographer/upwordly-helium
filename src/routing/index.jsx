import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import App from '../pages/App';
import Captioning from '../pages/Captioning';

const Routing = () => (
  <HashRouter hashType="slash">
    <div>
      <Route exact path="/" component={App} />
      <Route path="/:user/:job" component={Captioning} />
    </div>
  </HashRouter>
);

export default Routing;
