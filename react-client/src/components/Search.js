import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ apiEndpoint, documentId }) => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    axios
      .get(apiEndpoint, {
        params: { document_id: documentId, keyword: keyword }
      })
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.error('검색 오류:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>

      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
