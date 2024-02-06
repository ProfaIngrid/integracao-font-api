const express = require('express');
const app = express();
const port = 3000;
const tarefaRoutes = require('./routes/tarefaRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.use('/tarefas', tarefaRoutes);


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});