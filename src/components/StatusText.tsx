import * as React from 'react';
import { Status } from '../app';

type Props = {
  status: Status;
};

const labels: { [key: string]: string } = {
  idle: 'idle',
  startup: 'start up ...',
  running: 'running',
  shutdown: 'shutdown ...'
};

const colors: { [key: string]: string } = {
  idle: 'grey',
  startup: 'warning',
  running: 'success',
  shutdown: 'warning'
};

export const StatusText: React.SFC<Props> = ({ status }: Props) => (
  <input
    type="text"
    readOnly={true}
    className={`input is-static is-small has-text-${colors[status]}`}
    value={labels[status]}
  />
);
