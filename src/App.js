import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      const repos= response.data;
      setRepositories(repos);
    });
  },[]);


  async function handleAddRepository() {
    const newRepository = {
      title: `Repository ${Date.now()}`,
      owner: 'Andrefig',
      techs: ['NodeJS']
    }

    const response = await api.post('/repositories', newRepository);

    setRepositories([ ...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const deletedRepositoryIndex = repositories.findIndex(repository => repository.id === id);

    setRepositories([...repositories.slice(0,deletedRepositoryIndex), ...repositories.slice(deletedRepositoryIndex+1)]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (<li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>);
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
