import React from 'react';
import ReactDOM from 'react-dom';

// yarn add enzyme react-test-renderer
import { shallow } from 'enzyme';

import App from './App';

/**
 * This test mounts a component and makes sure that 
 * it didn’t throw during rendering. 
 */
it('App renders without crashing', () => {
  shallow( <App /> );
});


