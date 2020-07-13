import React from 'react';
import s from './App.module.scss';

import { GamesList } from './../list/GamesList';

export const App = () => (
  <div className={s['c-app']}>
    <header className={s['c-app__header']}>
      Games List
    </header>

    <main className={s['c-app__body']}>
      <GamesList />
    </main>
  </div>
);
