import React, { FC } from 'react';

import useMove from "hooks/useMove";
import useBingo from "hooks/useBingo";
import useDispatch from "hooks/useDispatch";
import cls from "styles/move.module.scss";

const Move: FC = () => {
  const [bingo, origDispatchBingo] = useBingo();
  const [move, origDispatchMove] = useMove();
  const dispatchMove = useDispatch(origDispatchBingo);
  const dispatchBingo = useDispatch(origDispatchMove);

  return (
    <div className={cls['move-btn-wrapper']}>
      <div className={cls['btn']}>
        <span>{bingo.play}</span>
        <span>Move</span>
      </div>
    </div>
  );
};

export default Move;
