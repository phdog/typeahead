import * as React from 'react';
import { Route, Redirect } from 'react-router';

import App from './main/components/App';

  export default function() {
    return (
      <Route path="/" component={App} >
      <Route
        path={'/:id'}
        
      />
      </Route>
  );
}
