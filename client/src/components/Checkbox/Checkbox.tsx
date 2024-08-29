import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';
import styles from './Checkbox.module.css';

import {
  fetchVisited,
  fetchAddVisited,
  fetchRemoveVisited,
} from '../../redux/thunkActionsCurrentMuseum';

import type { RouteParams } from '../../Pages/CurrentMuseum/currMusTypes';

export default function Checkbox() {
  const { t } = useTranslation();
  const { id } = useParams<RouteParams>();

  const dispatch = useAppDispatch();

  const user = useAppSelector((store) => store.userSlice.user);
  const visitedMuseums = useAppSelector((store) => store.visitedSlice.visited);
  const isVisited = visitedMuseums.some(
    (vis) => vis.museumId === parseInt(id, 10) && vis.userId === user.id,
  );

  const handleVisitedClick = () => {
    if (id) {
      const visitedMuseum = visitedMuseums.find(
        (vis) => vis.museumId === parseInt(id, 10) && vis.userId === user.id,
      );

      if (visitedMuseum) {
        dispatch(fetchRemoveVisited(visitedMuseum.id));
      } else {
        dispatch(
          fetchAddVisited({ userId: user.id, museumId: parseInt(id, 10) }),
        );
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <input className={styles.input}
        type="checkbox"
        checked={isVisited}
        onChange={handleVisitedClick}
      />
      <label>{t('visited')}</label>
    </div>
  );
}
