import React, { FC } from 'react';

import useMove from "hooks/useMove";
import useBingo from "hooks/useBingo";
import BingoItem from "./BingoItem";
import Move from "./Move";
import cls from "styles/bingo-grid.module.scss";

const BingoGrid: FC = () => {
  const [move, dispatchMove] = useMove();
  const [bingo, dispatchBingo] = useBingo();

  return (
    <div className={cls['bingo-wrapper']}>
      {bingo.cells.map((v, idx) => {
        if (idx === 12) {
          return <Move />
        }
        return <BingoItem {...v} hit={move.moves.includes(v.idx)} key={`${v.idx}${v.value}`} />
      })}
    </div>
  );
};

export default BingoGrid;
