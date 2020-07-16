import React, { useState , useEffect } from "react";
import "./styles.css";
import api from './services/api';


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('repositories').then(response =>{
        setRepositories(response.data);
      })
    }, [])
  ;

/**  CADASTRA REPOSITORIO  */
  async function handleAddRepository() {
   // setRepositories([...repositories, `Novo Repositorio ${Date.now()}`]);

    const response = await api.post('repositories', {
    title: `Novo Repositorio ${Date.now()}`,
    url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs",
    techs: "ReactJS"
  })

  const rep = response.data;
  setRepositories([...repositories, rep]);
  }


/*  DELETA REPOSITORIO  */

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
  
    if( response.status == 204) {
      const currentRepositories = repositories.filter(repositories => repositories.id != id)
      
      setRepositories(currentRepositories);
    }


  }  
    
  



/*  EXIBE NA TELA  */
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositories => (
        <li key = {repositories.id}>

           {repositories.title} 

          <button onClick={() => handleRemoveRepository(repositories.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
