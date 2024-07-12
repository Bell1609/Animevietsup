import React from 'react';

export const AnimeList = ({ animelist }) => {
  return (
    <>
      {animelist && animelist.map((anime, index) => (
        <div className="card" key={index}>
          <img src={anime.images.jpg.large_image_url} alt="animeImage" />
          <div className="anime-info">
            <h4>{anime.title}</h4>
          </div>
        </div>
      ))}
    </>
  );
};
