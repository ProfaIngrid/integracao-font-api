import {useEffect, useState} from 'react';
import api from '../services/Api';

function Tarefas(){
    const [tarefa, setTarefa] = useState([]);
    

    useEffect(() => {
        api 
        .get("/tarefas")
        .then((response) => setTarefa(response.data))
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    }, []);

    const criarTarefa = (e) => {
        e.preventDefault();
    }

    return(
        <>
            <div style={{display:"flex", justifyContent: "space-around", marginTop: "10px"}}>
            {
                tarefa.map((tarefa) => (
                    <div style={{border: "solid 1px", padding:"15px", backgroundColor: "#f0f0f0"}}>
                        <h2>Titulo: {tarefa.titulo}</h2>
                        <p>Descrição: {tarefa.descricao}</p>
                        <h4>Data: {tarefa.data}</h4>
                        {
                            tarefa.status === 0 
                            ? <h4>Status: Pendente</h4>
                            : <h4>Status: Concluído</h4>
                        }
                    </div>
                ))
            }
            </div>
            <form onSubmit={criarTarefa}>
                <label>
                    Título:
                    <input
                        type="text"
                        name="titulo"
                    />
                </label>
                <br />
                <label>
                    Descrição:
                    <input
                        type="text"
                        name="descricao"
                    />
                </label>
                <br />
                <label>
                    Data:
                    <input
                        type="date"
                        name="data"
                    />
                </label>
                <br />
                <label>
                    Status:
                    <input
                        type="number"
                        name="status"
                    />
                </label>
                <br />
                <button type="submit">Criar Nova Tarefa</button>
            </form>
        </>
    )
}

export default Tarefas;