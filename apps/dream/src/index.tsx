import { lazy } from 'solid-js';
import { render } from 'solid-js/web';
import { Routes, Route, Router } from '@solidjs/router';
import '@unocss/reset/tailwind.css';
import 'uno.css';
import './index.css';

const IndexPage = lazy(() => import('./pages/index'));

render(
  () => (
    <Router>
      <Routes>
        <Route path="/" component={IndexPage} />
      </Routes>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
