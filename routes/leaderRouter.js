const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end("Enviaraemos todos los lideres a usted");
})
.post((req,res,next) => {
    res.end('Agregaremos al lider '+ req.body.name +' con los detalles '+ req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('Operacion PUT no admitida en /leader');
})
.delete((req,res,next) => {
    res.end('Eliminaremos todos los lideres');
});


leaderRouter.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Enviaraemos detalles sobre el lider '+ req.params.leaderId);
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('Operacion POST no admitida en /leader/'+req.params.leaderId);
})
.put((req,res,next) => {
    res.write('Actualizando el lider: ' + req.params.leaderId);
    res.end('Actualizamos lider: '+ req.body.name +' con los detalles '+req.body.description);
})
.delete((req,res,next) => {
    res.end('Eliminaremos el lider: '+req.params.leaderId);
});

module.exports = leaderRouter;