import React, { useState, useMemo, useCallback } from 'react';
import './App.css';
import { Entry } from './Store/types';
import { useFetchHook } from './useFetchHook';
import { cors, corsValuesEnum } from './constants';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const App: React.FC = () => {
  const { entries, removeHandler, loading, categories } = useFetchHook();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCors, setSelectedCors] = useState<string>(corsValuesEnum.ALL)
  const [displayEntry, setDisplayEntry] = useState<Entry | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  const categoryChangeHandler = (e: any) => {
    setSelectedCategory(e.target.value);
  };

  const resetCategoriesHandler = () => {
    setSelectedCategory('All');
  }

  const handleEntryClick = useCallback((api: string) => {
    const entry = entries.find((entry: Entry) => entry.API === api);
    setDisplayEntry(entry || null);
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries
      .filter((entry: Entry) => (selectedCategory === 'All' ? entry : entry.Category === selectedCategory))
      .filter((entry: Entry) => (searchText.length < 3 ? entry : entry.API.toLocaleLowerCase().includes(searchText)))
      .filter((entry: Entry) => (selectedCors === corsValuesEnum.ALL ? entry : entry.Cors === selectedCors));
  }, [entries, selectedCategory, searchText, selectedCors]);

  const textChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  }

  const handleCorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCors(e.target.value);
  };

  return (
    <div className="App">
      <div className="filter-wrapper">
        <label>Category: </label>
        <select name="select category" onChange={categoryChangeHandler} value={selectedCategory}>
          {categories.map((category, index) => (<option value={category} key={index}>{category}</option>))}
        </select>
        <button className="button" onClick={resetCategoriesHandler}>Reset</button>
      </div>

      <div className="filter-wrapper">
        <label>API search: </label>
        <input type="text" placeholder="search" className="search-field" onChange={textChangeHandler} />
      </div>
      <div className="filter-wrapper">
        <label>Select cors: </label>
        <RadioGroup aria-label="gender" name="gender1" onChange={handleCorsChange} value={selectedCors}>
          {cors.map((item) => (<FormControlLabel value={item} key={item} control={<Radio />} label={item} />))}
        </RadioGroup>
      </div>
      <div className="filter-wrapper">
        <label className="filtered-count">Filtered count:</label>
        <span>{filteredEntries.length}</span>
      </div>
      {loading ? <span>loading...</span> :
        <ul className="list-wrapper">
          {filteredEntries.map((entry, index) =>
            <li
              key={index}
              className="list-item"
            >
              <div className="list-item-wrapper">
                <span className="api" onClick={() => handleEntryClick(entry.API)}>{entry.API}  </span> <span>{entry.Category}</span>
              </div>
              <button className="button" onClick={() => removeHandler({ api: entry.API })}>Remove</button>
            </li>)}
        </ul>
      }
      {!!displayEntry &&
        <div className="entry-info">
          <div className="entry-info-record">
            <span className="property">API:</span><span>{displayEntry.API}</span>
          </div>
          <div className="entry-info-record">
            <span className="property">Category:</span><span>{displayEntry.Category}</span>
          </div>
          <div className="entry-info-record">
            <span className="property">Description:</span><span>{displayEntry.Description}</span>
          </div>
          <div className="entry-info-record">
            <span className="property">Auth:</span><span>{displayEntry.Auth}</span>
          </div>
          <div className="entry-info-record">
            <span className="property">HTTPS:</span><span>{displayEntry.HTTPS ? 'yes' : 'no'}</span>
          </div>
          <div className="entry-info-record">
            <span className="property">Link:</span><a href={displayEntry.Link}>{displayEntry.Link}</a>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
