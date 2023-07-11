import React, {useState, useEffect} from 'react';
import './App.css';
import { TableWithBrowserPagination, Column } from 'react-rainbow-components';

function Search(){
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    
    const getData = async (keyword) => {
      try {
        const resp = await fetch('/.netlify/functions/search?query=' + keyword);
        const jsonResp = await resp.json();
        setData(jsonResp);
      } catch (error) {
        console.error("Couldn't fetch data:", error);
      }
    };

    if (keyword) { 
      getData(keyword);
    }
    else {
      setData([])
    }
  }, [keyword]);

  const keywordChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <div> 
      <div className="search-container">
        <label classname="search-label" for="search-container">Enter a keyword (data loads in 5-10s): </label> 
        <input
          type="text"
          value={keyword}
          onChange={keywordChange}
          placeholder="keyword"
        />
      </div>

      <TableWithBrowserPagination classname="table"
        keyField="id"
        data={data}
        variant="listView"
        pageSize={20}>
        <Column header="ID" field="id" />
        <Column header="Date" field="date" />
        <Column header="Phase" field="phase" />
          
      </TableWithBrowserPagination>
    </div> 
  );
    
}

export default Search; 