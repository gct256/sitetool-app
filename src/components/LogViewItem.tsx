import * as React from 'react';
import { Log } from '../app/logs';

type Props = {
  log: Log;
};

function getClassName(error: Error | false) {
  if (error === false) return 'log-view-item has-text-success';

  return 'log-view-item has-text-danger';
}

export const LogViewItem: React.SFC<Props> = ({ log }: Props) => (
  <p className={getClassName(log.error)}>{log.message}</p>
);
