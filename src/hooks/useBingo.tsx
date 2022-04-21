import React from 'react';

import { BingoContext } from 'store/bingo';

const useBingo = () => {
  const context = React.useContext(BingoContext);

  if (!context) {
    throw new Error('Hook useBingo has been called outside BingoContext provider');
  }

  return context;
}

export default useBingo;
