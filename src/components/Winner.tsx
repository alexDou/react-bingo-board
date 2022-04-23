import React, { FC, useState, useLayoutEffect, memo } from 'react';

import cls from "styles/move.module.scss";
import cls2 from "styles/winner.module.scss";

interface WinnerProps {
  name: string;
}

const emoji = ['😻', '👏', '🥂', '🥁', '💰', '🎉', '✅', '🤩', '💐', '🍾'];

const Winner: FC<WinnerProps> = ({ name }) => {
  const [greet, setGreet] = useState('');
  useLayoutEffect(() => {
    const greetInvl = setInterval(() => {
      const randKey = Math.floor(Math.random() * 9);
      setGreet(emoji[randKey]);
    }, 500);
    return () => clearInterval(greetInvl);
  }, [name]);

  return (
    <div className={cls['move-btn-wrapper']}>
      <div className={cls2['winner']}>
        <div>{name}</div>
        <div>
          <span className={cls2['emoji-holder']}>{greet}</span>
        </div>
      </div>
    </div>
  )
};

export default memo(Winner);
