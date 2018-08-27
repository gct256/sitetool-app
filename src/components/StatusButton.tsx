import * as React from 'react';
import { Status } from '../app';

type Props = {
  status: Status;
  onClick(): void;
};

const labels: { [key: string]: string } = {
  idle: 'Start',
  startup: '',
  running: 'Stop',
  shutdown: ''
};

const classes: { [key: string]: string } = {
  idle: 'is-light',
  startup: 'is-warning is-loading',
  running: 'is-success',
  shutdown: 'is-warning is-loading'
};

export const StatusButton: React.SFC<Props> = ({ status, onClick }: Props) => (
  <button
    className={`button is-fullwidth is-small ${classes[status]}`}
    onClick={onClick}
  >
    {labels[status]}
  </button>
);
