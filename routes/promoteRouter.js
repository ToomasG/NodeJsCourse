const express = require('express');
const bodyParser = require('body-parser');

const promoteRouter = express.Router();

promoteRouter.use(bodyParser.json());

promoteRouter.route('/')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end("Enviaraemos todos las promociones a usted");
})
.post((req,res,next) => {
    res.end('Agregaremos la promocion '+ req.body.name +' con los detalles '+ req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('Operacion PUT no admitida en /promotes');
})
.delete((req,res,next) => {
    res.end('Eliminaremos todos los platos');
});


promoteRouter.route('/:promoteId')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Enviaraemos detalles sobre la promocion '+ req.params.promoteId);
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('Operacion POST no admitida en /promote/'+req.params.promoteId);
})
.put((req,res,next) => {
    res.write('Actualizando la promocion: ' + req.params.promoteId);
    res.end('Actualizamos promocion: '+ req.body.name +' con los detalles '+req.body.description);
})
.delete((req,res,next) => {
    res.end('Eliminaremos la promocion: '+req.params.promoteId);
});

module.exports = promoteRouter;