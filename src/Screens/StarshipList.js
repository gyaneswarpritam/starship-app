import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarshipContainer = styled.div`
background-color: #f0f0f0;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: calc(50% - 200px);
  }

  @media (max-width: 480px) {
    width: 78%;
  }
  &.most-films {
    background-color: #ffc107;
  }

  &.normal-film {
    background-color: #B8B8B8;
  }

  .icon {
    font-size: 24px;
    margin-right: 5px;
  }
  .starship-image {
    width: 200px;
    height: 200px;
  }
`;

const StarshipList = () => {
    const [starships, setStarships] = useState([]);

    useEffect(() => {
        axios.get('https://swapi.dev/api/starships/')
            .then((response) => {
                const filteredStarships = response.data.results
                    .filter((starship) => starship.crew <= 10)
                    .sort((a, b) => a.crew - b.crew);

                const mostFilmsStarship = filteredStarships.reduce((prev, current) => (
                    prev.films.length > current.films.length ? prev : current
                ));

                setStarships(
                    filteredStarships.map((starship, index) => ({
                        ...starship,
                        isMostFilms: starship === mostFilmsStarship,
                        imageSrc: `assets/images/starship${index + 1}.jpg`,
                    }))
                );
            })
            .catch((error) => {
                console.error('Error fetching starships:', error);
            });
    }, []);

    return (
        <div className="starship-list">
            {starships.map((starship) => (
                <StarshipContainer
                    key={starship.name}
                    className={starship.isMostFilms ? 'most-films' : 'normal-film'}
                >
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: "85%" }}>
                            {starship.isMostFilms && (
                                <FontAwesomeIcon icon={faStar} className="icon" />
                            )}
                            <h2>{starship.name}</h2>
                            <p>Model: {starship.model}</p>
                            <p>Number of Films: {starship.films.length}</p>
                        </div>
                        <div style={{ width: "15%" }}>
                            <img
                                src={starship.imageSrc}
                                alt={`Image of ${starship.name}`}
                                className="starship-image"
                            />
                        </div>
                    </div>
                </StarshipContainer>
            ))}
        </div>
    );
};

export default StarshipList;
