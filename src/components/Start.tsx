import React, { FC, useRef, useState, useCallback } from 'react';

import useBingo from "hooks/useBingo";
import useDispatch from "hooks/useDispatch";
import cls from "styles/start.module.scss";
import { prefill } from "store/bingo";
import {BingoItem, BingoState} from "store/types";

const sanitize = (r: string[]) => {
  return r.map(cell => {
    return cell
      // sanitize scripts
      .replace(/[<[^>]+>/ig, '')
      .replace(/[^ ]script:/ig, '');
  });
}

const indexR = (r: string[]) => {
  return r
    .map((v, idx) => ({ idx: idx + 1, value: v }))
}

const insertEmptyCenter = (r: BingoItem[]) => {
  return [...r.slice(0, 12), {idx:0, value: ''}, ...r.splice(12)];
}

const shuffle = (r: string[] | Record<string, number|string>[]) => {
  return r
    .map(v => [v, Math.random()])
    .sort((a, b) => a[1] - b[1])
    .map(v => v[0]);
}

const Start: FC = () => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
  const [, dispatchBingo] = useBingo();
  const dispatch = useDispatch(dispatchBingo);

  const cellsRef = useRef(null);
  const playersRef = useRef(null);

  const handleChange = useCallback(() => {
    const cellsR = cellsRef.current?.value && cellsRef.current?.value.split(/\r?\n/);
    const playersR = playersRef.current?.value && playersRef.current?.value
      .split(/\r?\n/)
      .filter(c => c.length > 1);

    setDisableSubmit(() => cellsR.length !== 24 || playersR.length < 1 || playersR.length > 4);
    return;
  }, []);

  const handleSubmit = useCallback(() => {
    const cells: BingoState['cells'] = insertEmptyCenter(shuffle(indexR(sanitize(cellsRef.current?.value.split(/\r?\n/)))));
    const players: BingoState['players'] = shuffle(sanitize(playersRef.current?.value.split(/\r?\n/)));

    dispatch({ type: 'cells', payload: { cells }});
    dispatch({ type: 'players', payload: { players }});
    dispatch({ type: 'play', payload: { play: players[0] }});
    return;
  }, []);

  const prefillCells = useCallback(() => {
    cellsRef.current.value = prefill;
  }, []);

  return (
    <div className={cls['bingo-start-wrapper']}>
      <div className={cls['cells']}>
        <button className={cls['prefill']} onClick={() => prefillCells()}>
          Prefill for me
        </button>
        <label htmlFor="cells-values">
          24 values for your next game
          <br/>
          (<small>separated by a new line</small>)
        </label>
        <textarea
          name="cells"
          ref={cellsRef}
          id="cells-values"
          onChange={() => handleChange()}
        />
      </div>
      <div className={cls['players']}>
        <label htmlFor="players-values">
          Up to 4 players
          <br/>
          (<small>separated by a new line</small>)
        </label>
        <textarea
          name="cells"
          ref={playersRef}
          id="players-values"
          onChange={() => handleChange()}
        />
      </div>
      <div className={cls['submit-block']}>
        <button
          type="button"
          className={cls['submit-btn']}
          disabled={disableSubmit}
          onClick={() => handleSubmit()}
        >
          All Set
        </button>
      </div>
    </div>
  );
};

export default Start;
