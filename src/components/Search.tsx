import React, {FC, useState, useEffect, useMemo} from 'react';

import {useStoreDispatch, useStoreSelector} from "../hooks/useStore";
import useDebounce from "../hooks/useDebounce";
import {actionsApps} from "store/actions";
import {App} from "../store/types";
import cls from "../styles/search.module.scss";

const Search: FC = () => {
  const [value, setValue] = useState<string>('');
  const debounce = useDebounce<string>(value, 500);
  const [autocomplete, setAutocomplete] = useState<string[]>(['*']);
  const dispatch = useStoreDispatch();
  const apps = useStoreSelector<App[]>(state => state.apps.applicationsSort);

  const handleSearchChange = useMemo(() => (newValue: string) => {
    autocomplete[0] === '*' && setAutocomplete([]);
    setValue(newValue);
    if (newValue.length === 0) {
      handleSearchSelected('');
    }
  }, []);

  const handleSearchSelected = useMemo(() => (search: string) => {
    dispatch(actionsApps.searchApps(search));
    setAutocomplete(['*']);
    setValue(search);
  }, []);

  useEffect(() => {
    if (debounce.length >= 3 && autocomplete[0] !== '*') {
      const rx = new RegExp(debounce, 'i');
      setAutocomplete(() => apps.map((app: App) => {
        if (rx.test(app.title)) {
          return app.title;
        }
      }));
    }
  }, [debounce]);

  return (
    <div className={cls['list-search-bar']}>
      <div className={cls["list-search-bar_icon"]}/>
      <div className={cls["list-search-bar_txt"]}>
        <input
          type="text"
          placeholder="Search app name"
          value={value}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearchSelected(value);
            }
          }}
        />
        {!!autocomplete.length && <div className={cls["input-autocomplete"]}>
          <ul>
            {
              autocomplete[0] !== '*' && autocomplete.map((suggestion: App['title']) => {
                if (suggestion) {
                  return <li onClick={() => handleSearchSelected(suggestion)}>
                    {suggestion}
                  </li>
                }
              })
            }
          </ul>
        </div>}
      </div>
    </div>
  );
};

export default Search;
