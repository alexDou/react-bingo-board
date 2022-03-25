import React, { FC } from 'react';

import {useStoreSelector} from "hooks/useStore";
import {App} from "../store/types";
import cls from "styles/apps-list-grid.module.scss"

const AppsListGrid: FC = () => {
  const apps = useStoreSelector(state => state.apps.applicationsSort);

  return (
    <div className={cls['apps-list-wrapper']}>
      {
        apps.map((app: App) => {
          return (
            <div className={cls['apps-list-grid-item']}>
              <div className={cls['item_value']}>
                {
                  app.isDeleted === false
                  ? <div className={cls['status-active']} />
                  : <div className={cls['status-deleted']} />
                }
              </div>
              <div className={cls['item_value']}>
                <div className={cls['picture']}>
                  {(app.googlePlayStoreInfo?.screenshots || app.appStoreInfo?.screenshots) && <img
                    src={
                      app.googlePlayStoreInfo
                        ? app.googlePlayStoreInfo.screenshots[0]
                        : app.appStoreInfo.screenshots[0]
                    }
                    alt={`${app.title} screenshot`}
                    loading="lazy"
                  />}
                </div>
                <div className={cls['title-company']}>
                  <div>{app.title}</div>
                  <div>
                    {app.googlePlayStoreInfo && app.googlePlayStoreInfo.studio}
                    {app.appStoreInfo && app.appStoreInfo.studio}
                  </div>
                </div>
              </div>
              <div className={cls['item_value']}>
                {app.featured ? <div>Featured</div> : ''}
              </div>
              <div className={cls['item_value']}>
                {
                  app.avails && Intl.NumberFormat('en-US', {
                    notation: "compact",
                    maximumFractionDigits: 1
                  }).format(app.avails)
                }
              </div>
              <div className={cls['item_value']}>
                {app.createdAt && new Intl.DateTimeFormat('en-US').format(new Date(app.createdAt))}
              </div>
              <div className={cls['item_value']}>
                {app.updatedAt && new Intl.DateTimeFormat('en-US').format(new Date(app.updatedAt))}
              </div>
              <div className={cls['item_value']}>
                age?
              </div>
              <div className={cls['item_value']}>
                {app.storeCategories}
              </div>
              <div className={cls['item_value']}>
                :
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default AppsListGrid;
