import React, { FC } from 'react';

import cls from "../styles/apps.module.scss";
import AppsListHeader from "./AppsListHeader";
import AppsListGrid from "./AppsListGrid";

interface AppsProps {}

const Apps: FC<AppsProps> = () => {

  return (
    <div className={cls["apps-wrapper"]}>
      <AppsListHeader />
      <AppsListGrid />
    </div>
  );
};

export default Apps;
