import React, { FC } from 'react';

import useMove from "hooks/useMove";
import useBingo from "hooks/useBingo";
import cls from "styles/bingo-grid.module.scss";

const BingoGrid: FC = () => {
  const [move, dispatchMove] = useMove();
  const [bingo, dispatchBingo] = useBingo();

  return (
    <div className={cls['bingo-wrapper']}>
    {/* bingo grid */}
    </div>
  );
};

export default BingoGrid;
