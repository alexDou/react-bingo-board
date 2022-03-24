import React, { FC } from 'react';

import cls from "../styles/apps-list-header.module.scss";

interface SortInHeaderProps {
  sortBy: string;
  sortable: boolean;
}

const SortInHeader: FC<SortInHeaderProps> = ({sortable, sortBy}) => {
  if (!sortable) {
    return null;
  }

  return <div className={cls['sort-block']}>
    <div className={cls['sort-asc']} />
    <div className={cls['sort-desc']} />
  </div>;
};

export default SortInHeader;
