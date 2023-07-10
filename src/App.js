import React, {useState, useEffect} from 'react';
import './App.css';

function Search(){
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try{
        const resp = await fetch('https://testtechnext1-pearl118.b4a.run/search/api/query/?query='+keyword);
        const jsonResp = await resp.json();
        //console.log(jsonResp);
        setData(jsonResp);
      } catch (error) {
        console.error("Couldn't fetch data:", error)
      }
    };

    if (keyword) { 
      getData();
    }
    else {
      setData([])
    }
  }, [keyword, currentPage]);

  const keywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((previousPage) => previousPage - 1);
    }
  };

  const nextPage = () => {
    setCurrentPage((previousPage) => previousPage + 1);

  };

  return (
    <div className="container">
      <div className="search-container"> 
        <input
          type="text"
          value={keyword}
          onChange={keywordChange}
          placeholder="Enter keyword"
        />

        <div className="table-container"> 
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Phase</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.date}</td>
                    <td>{item.phase}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No data found</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      <div className="buttons">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={nextPage}>Next Page</button>
      </div>
    </div>
  );
    
}

export default Search; 