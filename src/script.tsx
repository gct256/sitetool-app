import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '@fortawesome/fontawesome';
import '@fortawesome/fontawesome-free-solid';

import { AppStore } from './app';
import { getStore } from './bridge';
import { App } from './components/App';

import './style.scss';

function main(root: HTMLElement | null): void {
  if (root === null) {
    return;
  }

  const store: AppStore = getStore();

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );
}

main(document.getElementById('root'));
