import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.element.isRequired
};


const App = (props) => (
  <main>
    {props.children}
  </main>
);

App.propTypes = propTypes;

export default App;
