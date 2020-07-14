import React from 'react';

import s from './Region.module.scss';

export const getRegionFileName = (region) => {
  switch(region) {
    case 'PAL-AU':
      return 'au';
    case 'PAL-EU':
      return 'eu';
    case 'NTSC-J':
      return 'jp';
    case 'NTSC-UC':
      return 'us';
    case 'NTSC-A':
      return 'as';
    default:
      return 'world';
  }
}

export const Region = (props) => {
  const { region } = props;
  const regionFile = getRegionFileName(region);

  return <div className={s['c-region']} title={region}>
    <img
      src={`${process.env.PUBLIC_URL}/regions/${regionFile}.svg`}
      className={s['c-region__flag']}
    />
  </div>
}
