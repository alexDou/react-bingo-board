import React, { FC } from 'react';
import cn from 'classnames';

import useMove from "hooks/useMove";
import cls from "styles/bingo-item.module.scss";

interface BingoItem {
  idx: number;
  value: string;
  hit?: true;
}

const BingoItem: FC<BingoItem> = ({idx, value, hit= false}) => {
  const [move] = useMove();

  const itemClasses = cn({
    [cls['bingo-item']]: true,
    [cls['pending']]: move.status === 'pending',
    [cls['hit']]: move.status === 'fulfilled' && hit
  });

  return (
    <div className={itemClasses}>
      <div className={cls['number']}>
        {idx}
      </div>
      <span>{value}</span>
    </div>
  );
};

export default BingoItem;
