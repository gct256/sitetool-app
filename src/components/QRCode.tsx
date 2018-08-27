import * as QRCodeReact from 'qrcode.react';
import * as React from 'react';

type Props = {
  url: string | null;
};

export const QRCode: React.SFC<Props> = ({ url }: Props) => {
  if (url === null) return null;

  return <QRCodeReact value={url} />;
};
