import React, { FC, useState, useEffect, useCallback } from 'react';
import Loading from "react-loading";

import useMove from "hooks/useMove";
import useBingo from "hooks/useBingo";
import useDispatch from "hooks/useDispatch";
import Winner from "./Winner";
import makeMove from "api";
import { isWinningOrDraw, totalMovesAllowed } from "store/bingo";
import cls from "styles/move.module.scss";

const Move: FC = () => {
  const [winner, setWinner] = useState<boolean>(false);
  const [bingo, origDispatchBingo] = useBingo();
  const [move, origDispatchMove] = useMove();
  const dispatchMove = useDispatch(origDispatchMove);
  const dispatchBingo = useDispatch(origDispatchBingo);

  const moveClickHandler = useCallback(() => {
    dispatchMove({ type: 'status', payload: { status: 'pending' }});
    makeMove(move.moves)
      .then(moveOn => {
        // add the move & update cells
        dispatchMove({ type: 'moves', payload: { moves: moveOn }});
        dispatchBingo({
          type: 'cells',
          payload: {
            cells: bingo.cells.map((c, cIdx) => {
              return cIdx === (moveOn[0] - 1) ? { ...c, hit: true } : c;
            })
          }
        });

        // is it a winning or draw move
        isWinningOrDraw([...move.moves, ...moveOn], bingo, dispatchBingo);

        // change active player
        const [fstPlayer, ...restPlayers] = bingo.players;
        const newPlayers = [...restPlayers, fstPlayer];
        dispatchBingo({ type: 'players', payload: { players: newPlayers }});
        dispatchBingo({ type: 'play', payload: { play: newPlayers[0] }});

        // change network status
        dispatchMove({ type: 'status', payload: { status: 'fulfilled' }});
      })
      .catch(e => {
        dispatchMove({ type: 'error', payload: { error: e }});
      });
  }, [move.moves, bingo]);

  useEffect(() => {
    if (bingo.winners.length >= 1) {
      setWinner(true);
      const winnerTo = setTimeout(() => {
        setWinner(false);
      },5500);

      return () => clearTimeout(winnerTo)
    }
  }, [bingo.winners.length])

  if ((bingo.draw || move.moves.length - 1 >= totalMovesAllowed) && !winner) {
    return (
      <div className={cls['move-btn-wrapper']}>
        <div className={cls['game-over']}>
          <span>{bingo.draw ? 'Draw' : 'Game'}</span>
          <span>{bingo.draw ? 'Game' : 'Over'}</span>
        </div>
      </div>
    )
  }

  if (winner) {
    return <Winner name={bingo.winners[bingo.winners.length - 1]} />;
  }

  return (
    <div className={cls['move-btn-wrapper']}>
      {['fulfilled', 'idle'].includes(move.status) &&
        <div className={cls['btn']} onClick={() => moveClickHandler()}>
          <span>{!bingo.draw ? (move.moves.length - 1) < totalMovesAllowed ? bingo.play : 'End of' : 'Draw'}</span>
          <span>{!bingo.draw ? 'MOVES' : 'Game'}</span>
        </div>
      }
      {move.status === 'pending' &&
        <Loading type="cubes" color="rgba(63, 63, 63, 1)" />
       }
    </div>
  );
};

export default Move;
