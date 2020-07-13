import React, { useState } from 'react';

import s from './GamesList.module.scss';

import { withData } from "../data/withData";
import { Platform } from './../../objects/platform/Platform';
import { Region } from './../../objects/region/Region';
import { Condition } from './../../objects/condition/Condition';


const GamesListRow = (props) => {
  let { row, ...newProps } = props;
  return <tr {...newProps}>
    <td>{row['Game Name']}</td>
    <td><Platform platform={row['Platform']} /></td>
    <td><Region region={row['Region']} /></td>
    <td><Condition condition={row['Game']} /></td>
    <td><Condition condition={row['Manual/Inserts']} /></td>
    <td><Condition condition={row['Artwork/Box']} /></td>
    <td>Extras</td>
  </tr>;
}

export const GamesList = withData((props) => {
  const { loading, error, data } = props;

  const [ sort, setSort ] = useState('platform');

  if(error) return <div>Error Loading Data<br />{error}</div>;
  if(loading) return <div>Loading...</div>;
  if(!data) return <div>No Data.</div>;

  let dataSorted;
  Object.entries({
    'alpha': 'Game Name',
    'alpha-reverse': 'Game Name',
    'platform': 'Platform',
    'platform-reverse': 'Platform',
    'default': null
  }).find(([ key, value ]) => {
    if(key != sort) return false;
    if(value == null) return dataSorted = data;
    return dataSorted = data.sort((l,r) => {
      let d = l[value].localeCompare(r[value]);
      return d === 0 ? l['Game Name'].localeCompare(r['Game Name']) : d;
    });
  })

  if(sort.indexOf('reverse') !== -1) dataSorted.reverse();

  return (
    <table className={s['c-games-list']} cellPadding="0" cellSpacing="0">
      <thead>
        <tr>
          <td>Game Name</td>
          <td>Platform</td>
          <td>Region</td>
          <td>Game Condition</td>
          <td>Manual Condition</td>
          <td>Case/Box Condition</td>
          <td>Extras</td>
        </tr>
      </thead>

      <tbody>
        {dataSorted.map((row,i) => (
          <GamesListRow key={`games-list-row-${i}`} row={row}/>
        ))}
      </tbody>
    </table>
  )
});