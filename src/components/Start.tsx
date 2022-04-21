import React, { FC, useRef } from 'react';

import useBingo from "hooks/useBingo";
import useDispatch from "hooks/useDispatch";
import cls from "styles/bingo-start.module.scss";

const Start: FC = () => {
  const [bingo, dispatchBingo] = useBingo();
  const dispatch = useDispatch(dispatchBingo);

  const cellsRef = useRef();
  const players = useRef();

  return (
    <div className={cls['bingo-start-wrapper']}>
      <div className={cls['cells']}>
        <label htmlFor="cells-values">
          Please, enter 24 values for your next game
          <small>separated by a new line</small>
        </label>
        <textarea name="cells" ref={cellsRef} id="cells-values" />
      </div>
      <div className={cls['players']}>
        <label htmlFor="players-values">
          Please, enter up to 4 players names
          <small>separated by a new line</small>
        </label>
        <textarea name="cells" ref={cellsRef} id="players-values" />
      </div>
      <div className={cls['submit-block']}>
        <button type="button" className={cls['submit-btn']}>
          Set your game
        </button>
      </div>
    </div>
  );
};

export default Start;
