import React, { FC } from 'react';

import Search from "./Search";
import Apps from "./Apps";

interface AppsListProps {}

const AppsList: FC<AppsListProps> = () => {

  return (
    <>
      <Search />
      <Apps />
    </>
    );
};

export default AppsList;
