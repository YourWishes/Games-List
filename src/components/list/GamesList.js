import React, { useState } from 'react';

import s from './GamesList.module.scss';

import { withData } from "../data/withData";
import { Platform } from './../../objects/platform/Platform';
import { Region } from './../../objects/region/Region';
import { Condition } from './../../objects/condition/Condition';


const GameListHeader = (props) => {
  const { setSort, sortKey, sort, children } = props;

  let canSort = sortKey && sortKey.length;
  let isSorting = canSort && sort.startsWith(sortKey);
  let isReversed = isSorting && sort.endsWith('reverse')

  let className = [
    s['c-games-list__header-sorter'],
    isSorting ? s['is-sorting'] : '',
    isReversed ? s['is-reversed'] : '',
    canSort ? s['can-sort'] : ''
  ].join(' ' )

  const doSort = () => setSort(isSorting && !isReversed ? `${sortKey}-reverse` : sortKey);

  return <th className={className} onClick={e => doSort()}>
    { children }
  </th>
}

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

  const [ sort, setSort ] = useState('alpha');

  if(error) return <div>Error Loading Data<br />{error}</div>;
  if(loading) return <div>Loading...</div>;
  if(!data) return <div>No Data.</div>;

  let dataSorted;
  Object.entries({
    'alpha': 'Game Name',
    'alpha-reverse': 'Game Name',

    'platform': 'Platform',
    'platform-reverse': 'Platform',

    'region': 'Region',
    'region-reverse': 'Region',

    'game': 'Game',
    'game-reverse': 'Game',

    'manual': 'Manual/Inserts',
    'manual-reverse': 'Manual/Inserts',

    'artwork': 'Artwork/Box',
    'artwork-reverse': 'Artwork/Box',

    'default': null
  }).find(([ key, value ]) => {
    if(key != sort || value == null) return false;
    return dataSorted = data.sort((l,r) => {
      let d = l[value].localeCompare(r[value]);
      return d === 0 ? l['Game Name'].localeCompare(r['Game Name']) : d;
    });
  });

  dataSorted = dataSorted || data;
  if(sort.indexOf('reverse') !== -1) dataSorted.reverse();

  return (
    <table className={s['c-games-list']} cellPadding="0" cellSpacing="0">
      <thead>
        <tr>
          {Object.entries({
            "Game Name": 'alpha',
            "Platform": 'platform',
            "Region": 'region',
            "Game Condition": 'game',
            "Manual Condition": 'manual',
            "Artwork/Box Condition": 'artwork',
            "Extras": ''
          }).map(([ key, value]) => {
            return <GameListHeader setSort={setSort} sort={sort} sortKey={value}>
              { key }
            </GameListHeader>
          })}
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