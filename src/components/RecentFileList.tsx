import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../app';
import { getRuntime } from '../bridge';
import { exists, isDirectory } from '../utils';
import { RecentFileListItem } from './RecentFileListItem';

function mapStateToProps(state: AppState) {
  return {
    recentFiles: state.recentFiles,
    async onSelect(filePath: string) {
      if (!exists(filePath)) return;
      if (await isDirectory(filePath)) {
        await getRuntime().openDirectory(filePath);
      } else {
        await getRuntime().openConfigFile(filePath);
      }
    }
  };
}

type Props = ReturnType<typeof mapStateToProps>;

class RecentFileListClass extends React.Component<Props> {
  public render() {
    const { recentFiles, onSelect } = this.props;
    const children = recentFiles.map((filePath: string) => (
      <RecentFileListItem
        key={filePath}
        filePath={filePath}
        onSelect={onSelect}
      />
    ));

    return (
      <>
        <p className="title is-size-4">Recent files</p>
        {children}
      </>
    );
  }
}

export const RecentFileList = connect(mapStateToProps)(RecentFileListClass);