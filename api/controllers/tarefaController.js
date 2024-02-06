const express = require('express');
const router = express.Router();
const dbConecta = require('../models/dbConnection');

router.get('/', (req, res) => {
    dbConecta.query('SELECT * FROM tbtarefas order by data', (err, result) => {
        if(err) throw err;
        res.json(result);
    })
});

router.get('/:data', (req, res) => {
    const data = req.params.data;
    const query = `select * from tbtarefas where data like ? order by data`;
    dbConecta.query(query, [`%${data}%`] , (err, result) => {
        if (err) {
            res.status(500).json({ mensagem: 'Tarefa não encontrada' });
        } else {
            result.length  !== 0 ? res.json(result) : res.json({ mensagem: 'Nenhuma tarefa não encontrada' });
        }
    })
});


router.post('/', (req, res) => {
    const { titulo, descricao, data, status } = req.body;
    const query = 'INSERT INTO tbtarefas (titulo, descricao, data, status) VALUES (?, ?, ?, ?)';
    
    dbConecta.query(query, [titulo, descricao, data, status], (err, result) => {
        if (err) {
            res.status(500).json({ mensagem: 'Erro ao adicionar produto.' });
        } else {
            res.status(201).json({
                mensagem: 'Produto adicionado!',
                id_produto: result.insertId, 
                body: req.body
            });
        }
    });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const query = `DELETE FROM tbtarefas WHERE id = ?`;

    dbConecta.query(query, [id], (err, result) =>{
        if (err) {
            res.status(500).json({ mensagem: 'Erro ao adicionar produto.' });
        } else {
            res.status(201).json({
                mensagem: `Produto de id: ${id}, deletado com sucesso!`
            });
        }
    });
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {titulo, descricao, data, status} = req.body;
    const query = `UPDATE tbtarefas SET titulo = ?, descricao = ?, data = ?, status = ? WHERE id = ?`

    dbConecta.query(query, [titulo, descricao, data, status, id], (err)=>{
        if(err) throw err;
        res.status(201).json({
            mensagem: `Alteração aplicada!`,
            envio: {
                id : id,
                titulo: titulo,
                descricao: descricao,
                data: data,
                status: status
            }
        })
    })
});


module.exports = router;