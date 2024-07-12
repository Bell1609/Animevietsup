import React, { useEffect, useState } from "react";
import './Components/style.css';
import { AnimeList } from "./Components/AnimeList";

function App() {
  const [search, setSearch] = useState('');
  const [animeData, setAnimeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const getData = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=20`);
      if (res.ok) {
        const resData = await res.json();
        setAnimeData(resData.data || []);
      } else {
        console.error("Error fetching data:", res.status);
        setAnimeData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setAnimeData([]);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  // Calculate current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = animeData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="header">
        <h1>Anime Search API</h1>
        <div className="search-box">
          <input type="search" placeholder="Search your anime in here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="container">
        <div className="anime-row">
          <div className="row">
            <AnimeList animelist={currentItems} />
          </div>
        </div>

        <div className="pagination">
          {[...Array(Math.ceil(animeData.length / itemsPerPage)).keys()].map(number => (
            <button key={number + 1} onClick={() => paginate(number + 1)}>{number + 1}</button>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
