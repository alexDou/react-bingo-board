import React, { FC } from 'react';

import useBingo from "hooks/useBingo";
import BingoItem from "./BingoItem";
import Move from "./Move";
import cls from "styles/bingo-grid.module.scss";

const BingoGrid: FC = () => {
  const [bingo] = useBingo();

  return (
    <div className={cls['board-and-winners']}>
      <div className={cls['bingo-wrapper']}>
        {bingo.cells.map((v, idx) => {
          if (idx === 12) {
            return <Move key="center" />
          }
          return <BingoItem {...v} key={`${v.idx}${v.value}`} />
        })}
      </div>
    </div>
  );
};

export default BingoGrid;
