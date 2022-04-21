import React from 'react';

import { MoveContext } from 'store/move';

const useMove = () => {
  const context = React.useContext(MoveContext);

  if (!context) {
    throw new Error('Hook useMove has been called outside MoveContext provider');
  }

  return context;
}

export default useMove;
