import React, { FC } from 'react';

import cls from "../styles/apps.module.scss";
import AppsListHeader from "./AppsListHeader";

interface AppsProps {}

const Apps: FC<AppsProps> = (props) => {

  return (
    <div className={cls["apps-wrapper"]}>
      <AppsListHeader />
    </div>
  );
};

export default Apps;
