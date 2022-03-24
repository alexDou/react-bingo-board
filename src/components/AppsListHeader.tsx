import React, { FC } from 'react';

import SortInHeader from "./SortInHeader";
import cls from "../styles/apps-list-header.module.scss";

type HeadersConfigType = {
  item: string;
  caption: string;
  sortable?: boolean;
}

export const headersConfig: HeadersConfigType[] = [
  { item: 'status', caption: 'Status' },
  { item: 'title', caption: 'App title and publisher', sortable: true },
  { item: 'featured', caption: '' },
  { item: 'avails', caption: 'Daily avails', sortable: true },
  { item: 'createdAt', caption: 'Date added', sortable: true },
  { item: 'updatedAt', caption: 'Updated on', sortable: true },
  { item: 'age', caption: 'Age' },
  { item: 'category', caption: 'Category' },
  { item: 'actions', caption: '' },
];

const AppsListHeader: FC = () => {
  return (
    <div className={cls['headers-container']}>
      {
        headersConfig.map(header => {
          return <div className={cls['header-item']}>
            {header.caption}
            <SortInHeader sortable={!!header.sortable} sortBy={header.item} />
          </div>
        })
      }
    </div>
  );
};

export default AppsListHeader;
