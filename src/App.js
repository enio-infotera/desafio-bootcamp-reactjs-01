import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const data = {
      title: `Novo reposotório ${Date.now()}`,
      url: '',
      techs: [
        'NodeJs', 'ReactJS', 'React Native'
      ]
    };

    try {
      const response = await api.post('repositories', data);

      const repository = response.data;

      setRepositories([...repositories, repository]);
    } catch (err) {
      alert('Erro ao adicionar repositório, tente novamente.')
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch (err) {
      alert('Erro ao remover repositório, tente novamente');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
