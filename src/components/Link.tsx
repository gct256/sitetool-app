import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import { sendToClipboard, showUrl } from '../utils';

interface Props {
  url: string;
}

export class Link extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  public handleOpen() {
    const { url } = this.props;
    showUrl(url);
  }

  public handleCopy() {
    const { url } = this.props;
    sendToClipboard(url);
  }

  public render() {
    const { url } = this.props;

    return (
      <p className="link">
        <a role="button" onClick={this.handleOpen}>
          <span className="icon">
            <FontAwesomeIcon icon="external-link-alt" />
          </span>
        </a>
        <a role="button" onClick={this.handleCopy}>
          <span className="icon">
            <FontAwesomeIcon icon="clipboard" />
          </span>
        </a>
        <span>{url}</span>
      </p>
    );
  }
}
