import * as React from 'react';
import { Empty } from './Empty';
import { LogView } from './LogView';
import { Message } from './Message';
import { Navbar } from './Navbar';
import { Running } from './Running';

export const App: React.SFC = () => (
  <>
    <Message />
    <Navbar />
    <div className="main">
      <Empty />
      <Running />
    </div>
    <LogView limit={500} />
  </>
);
