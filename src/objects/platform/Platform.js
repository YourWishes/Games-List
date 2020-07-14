import React from 'react';

import s from './Platform.module.scss';

export const Platform = (props) => {
  const { platform } = props;

  return <div className={s['c-platform']} title={platform}>
    <img
      src={`${process.env.PUBLIC_URL}/platforms/${platform}.svg`}
      className={s['c-platform__icon']}
      alt={platform}
    />
  </div>
}
