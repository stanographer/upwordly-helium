import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import App from '../../pages/App';
import Captioning from '../../pages/Captioning';

const Routing = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/captioning/:user/:job" component={Captioning} />
    </div>
  </Router>
);

export default Routing;
