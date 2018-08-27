import * as React from 'react';
import { Empty } from './Empty';
import { Message } from './Message';
import { Navbar } from './Navbar';
import { Running } from './Running';

export const App: React.SFC = () => (
  <>
    <Navbar />
    <Empty />
    <Running />
    <Message />
  </>
);
