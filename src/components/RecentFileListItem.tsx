import * as React from 'react';
import { showFile } from '../utils';

type Props = {
  filePath: string;
  onSelect(filePath: string): void;
};

export class RecentFileListItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  public handleOpen() {
    const { filePath, onSelect } = this.props;
    onSelect(filePath);
  }

  public handleShow() {
    const { filePath } = this.props;
    showFile(filePath, true);
  }

  public render() {
    const { filePath } = this.props;

    return (
      <div className="recent-file-list-item buttons">
        <button className="button is-small is-link" onClick={this.handleOpen}>
          Open
        </button>
        <button className="button is-small" onClick={this.handleShow}>
          Show
        </button>
        <div className="file-path">{filePath}</div>
      </div>
    );
  }
}
