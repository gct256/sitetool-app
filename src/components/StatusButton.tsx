import { IconProp } from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  running: 'is-info',
  shutdown: 'is-warning is-loading'
};

const icons: { [key: string]: IconProp } = {
  idle: 'play',
  startup: 'spinner',
  running: 'stop',
  shutdown: 'spinner'
};

export const StatusButton: React.SFC<Props> = ({ status, onClick }: Props) => (
  <button
    className={`button is-fullwidth is-small ${classes[status]}`}
    onClick={onClick}
  >
    <span className="icon">
      <FontAwesomeIcon icon={icons[status]} />
    </span>
    <span>{labels[status]}</span>
  </button>
);
