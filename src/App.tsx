import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { Navigation } from '@/components';
import { RouterConfig } from '@/routes';

const App: React.FC = () => (
  <Router>
    <div>
      <Navigation />
      <main>
        <RouterConfig />
      </main>
    </div>
  </Router>
);

export default App;
