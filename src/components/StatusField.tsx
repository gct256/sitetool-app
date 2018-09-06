import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import { Status } from '../app';
import { StatusText } from './StatusText';

type Props = {
  label: string;
  status: Status;
  pause(): void;
  resume(): void;
  restart(): void;
};

function renderPauseButton({ status, pause, resume }: Props) {
  switch (status) {
    case 'idle':
      return (
        <button className="button is-rounded is-small" onClick={resume}>
          <span className="icon">
            <FontAwesomeIcon icon="play" />
          </span>
          <span>Resume</span>
        </button>
      );

    case 'running':
      return (
        <button className="button is-rounded is-small" onClick={pause}>
          <span className="icon">
            <FontAwesomeIcon icon="pause" />
          </span>
          <span>Pause</span>
        </button>
      );

    default:
      return (
        <button
          className="button is-rounded is-small is-loading"
          disabled={true}
        />
      );
  }
}

function renderRestartButton({ status, restart }: Props) {
  if (status !== 'running') {
    return (
      <button className="button is-rounded is-small" disabled={true}>
        <span className="icon">
          <FontAwesomeIcon icon="redo-alt" />
        </span>
        <span>Restart</span>
      </button>
    );
  }

  return (
    <button className="button is-rounded is-small" onClick={restart}>
      <span className="icon">
        <FontAwesomeIcon icon="redo-alt" />
      </span>
      <span>Restart</span>
    </button>
  );
}

export const StatusField: React.SFC<Props> = (props: Props) => (
  <div className="field is-horizontal">
    <div className="field-label">
      <label className="label">{props.label}</label>
    </div>
    <div className="field-body">
      <div className="field is-expanded">
        <div className="field is-grouped">
          <p className="control is-expanded">
            <StatusText status={props.status} />
          </p>
          <div className="control">
            <div className="buttons has-addons running-buttons">
              {renderPauseButton(props)}
              {renderRestartButton(props)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
