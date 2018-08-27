import * as React from 'react';
import { Status } from '../app';
import { showUrl } from '../utils';

type Props = {
  status: Status;
  link?: string;
};

const labels: { [key: string]: string } = {
  idle: 'Idle',
  startup: 'Start up ...',
  running: 'Running',
  shutdown: 'Shutdown ...'
};

const colors: { [key: string]: string } = {
  idle: 'grey',
  startup: 'warning',
  running: 'success',
  shutdown: 'warning'
};

export class StatusText extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick() {
    const { link } = this.props;

    if (link !== undefined && link.length > 0) showUrl(link);
  }

  public render() {
    const { status } = this.props;

    return <p className={`has-color-${colors[status]}`}>{this.renderLink()}</p>;
  }

  private renderLink() {
    const { status, link } = this.props;

    if (link === undefined || link.length === 0) {
      return <span>{labels[status]}</span>;
    }

    return (
      <a role="button" onClick={this.handleClick}>
        {labels[status]}
      </a>
    );
  }
}
