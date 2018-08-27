import * as React from 'react';

import { showUrl } from '../utils';

interface Props {
  url: string | null;
}

export class Link extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick() {
    const { url } = this.props;
    if (url !== null) showUrl(url);
  }

  public render() {
    const { url } = this.props;

    if (url === null) {
      return (
        <>
          <button className="button is-small is-link" disabled={true}>
            (no local server)
          </button>
        </>
      );
    }

    return (
      <>
        <button className="button is-small is-link" onClick={this.handleClick}>
          open {url}
        </button>
      </>
    );
  }
}
