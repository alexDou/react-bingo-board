import React, { FC, useState, useEffect } from 'react';

import {useStoreSelector} from "../hooks/useStore";
import { actionsApps } from "store/actions";
import {App} from "../store/types";
import cls from "../styles/search.module.scss";

interface SearchProps {}

const Search: FC<SearchProps> = () => {
  const [value, setValue] = useState<string>('');
  const [autocomplete, setAutocomplete] = useState<string[]>([]);
  const apps = useStoreSelector<App[]>(state => state.apps.applicationsSort);

  useEffect(() => {
    if (value.length >= 3) {
      const rx = new RegExp(value, 'i');
      setAutocomplete(() => apps.map((app: App) => {
        if (rx.test(app.title)) {
          return app.title;
        }
      }));
      actionsApps.searchApps(value);
    }
  }, [value]);

  return (
    <div className={cls['list-search-bar']}>
      <div className={cls["list-search-bar_icon"]} />
      <div className={cls["list-search-bar_txt"]}>
        <input
          type="text"
          placeholder="Search app name"
          onChange={(e) => setValue(e.target.value)}
        />
        {!!autocomplete.length && <div className={cls["input-autocomplete"]}>
          <ul>
          {
            autocomplete.map((suggestion: App['title']) => {
                return <li onClick={() => setValue(suggestion)}>
                  {suggestion}
                </li>
            })
          }
          </ul>
        </div>}
      </div>
    </div>
  );
};

export default Search;
