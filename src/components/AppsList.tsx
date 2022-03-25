import React, { FC, useEffect } from 'react';
import {useDispatch} from "react-redux";
import ReactLoading from "react-loading";

import {NetworkStatus, RequestBody} from "store/types";
import {useStoreSelector} from "../hooks/useStore";
import {actionsApps} from "store/actions";
import Search from "./Search";
import Apps from "./Apps";
import cls from "styles/loader.module.scss";

const AppsList: FC = () => {
  const status: NetworkStatus = useStoreSelector(state => state.network.status);
  const reqBody: RequestBody = useStoreSelector(state => state.apps.request);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === NetworkStatus.LOAD) {
      dispatch(actionsApps.getApps(reqBody));
    }
  }, []);

  if ([NetworkStatus.LOAD, NetworkStatus.PENDING].includes(status)) {
    return <div className={cls['loader']}>
      <ReactLoading type='spin' color='darkgrey' height='20%' width='20%' />
    </div>;
  }

  return (
    <>
      <Search />
      <Apps />
    </>
    );
};

export default AppsList;
