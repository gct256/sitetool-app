import * as React from 'react';
import { connect } from 'react-redux';

import { AppDispatch, AppState } from '../app';
import { recentFiles } from '../app/recentFiles';
import { getRuntime } from '../bridge';
import { exists, isDirectory } from '../utils';
import { RecentFileListItem } from './RecentFileListItem';

function mapStateToProps(state: AppState) {
  return {
    files: state.recentFiles,
    async onSelect(filePath: string) {
      if (!(await exists(filePath))) return;
      if (await isDirectory(filePath)) {
        await getRuntime().openDirectory(filePath);
      } else {
        await getRuntime().openConfigFile(filePath);
      }
    }
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    onRemove(filePath: string) {
      dispatch(recentFiles.remove(filePath));
    }
  };
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class RecentFileListClass extends React.Component<Props> {
  public render() {
    const { files, onSelect, onRemove } = this.props;
    const children = files.map((filePath: string) => (
      <RecentFileListItem
        key={filePath}
        filePath={filePath}
        onSelect={onSelect}
        onRemove={onRemove}
      />
    ));

    return (
      <>
        <div className="box is-radiusless recent-file-list">
          <p className="title is-size-4">Recent files</p>
          {children}
        </div>
      </>
    );
  }
}

export const RecentFileList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentFileListClass);
