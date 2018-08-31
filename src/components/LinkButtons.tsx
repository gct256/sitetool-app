import * as React from 'react';
import { URLSet } from '../app/ui';
import { Link } from './Link';

type Props = {
  urls: URLSet | null;
};

export const LinkButtons: React.SFC<Props> = ({ urls }: Props) => {
  if (urls === null) {
    return <p>local server is not running</p>;
  }

  return (
    <>
      <div className="content">
        <Link url={urls.local} />
        <Link url={urls.external} />
      </div>
    </>
  );
};
