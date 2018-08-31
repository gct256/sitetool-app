import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { showFile } from '../utils';

type Props = {
  filePath: string;
  onSelect(filePath: string): void;
  onRemove(filePath: string): void;
};

export class RecentFileListItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  public handleOpen() {
    const { filePath, onSelect } = this.props;
    onSelect(filePath);
  }

  public handleShow() {
    const { filePath } = this.props;
    showFile(filePath, true);
  }

  public handleRemove() {
    const { filePath, onRemove } = this.props;
    onRemove(filePath);
  }

  public render() {
    const { filePath } = this.props;

    return (
      <div className="recent-file-list-item">
        <div className="file-path">{filePath}</div>
        <div className="buttons has-addons">
          <button
            className="button is-small is-inverted is-rounded"
            onClick={this.handleOpen}
          >
            <span className="icon">
              <FontAwesomeIcon icon="folder-open" />
            </span>
            <span>Open</span>
          </button>
          <button
            className="button is-small is-inverted is-rounded"
            onClick={this.handleShow}
          >
            <span className="icon">
              <FontAwesomeIcon icon="search" />
            </span>
            <span>Show</span>
          </button>
          <button
            className="button is-small is-inverted is-rounded"
            onClick={this.handleRemove}
          >
            <span className="icon has-text-danger">
              <FontAwesomeIcon icon="times" />
            </span>
          </button>
        </div>
      </div>
    );
  }
}
