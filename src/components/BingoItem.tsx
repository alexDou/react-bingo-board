import React, { FC } from 'react';

import cls from "styles/bingo-item.module.scss";

interface BingoItem {
  idx: number;
  value: string;
  hit: boolean;
}

const BingoItem: FC<BingoItem> = ({idx, value, hit}) => {
  return (
    <div className={cls['bingo-item']}>
      <div className={cls['number']}>
        {idx}
      </div>
      <span>{value}</span>
    </div>
  );
};

export default BingoItem;
