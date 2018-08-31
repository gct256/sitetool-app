import * as React from 'react';
import * as strftime from 'strftime';
import { Log } from '../app/logs';

type Props = {
  log: Log;
};

function format(time: number): string {
  return strftime('%H:%M:%S.%L', new Date(time));
}

function getClassName(error: Error | false) {
  if (error === false) return 'log-view-item has-text-success';

  return 'log-view-item has-text-danger';
}

export const LogViewItem: React.SFC<Props> = ({ log }: Props) => (
  <p className={getClassName(log.error)}>
    [{format(log.time)}] {log.message}
  </p>
);
