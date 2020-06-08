const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end("Enviaraemos todos los platos a usted");
})
.post((req,res,next) => {
    res.end('Agregaremos el plato '+ req.body.name +' con los detalles '+ req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('Operacion PUT no admitida en /platos');
})
.delete((req,res,next) => {
    res.end('Eliminaremos todos los platos');
});


dishRouter.route('/:dishId')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Enviaraemos detalles sobre el plato '+ req.params.dishId);
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('Operacion POST no admitida en /dish/'+req.params.dishId);
})
.put((req,res,next) => {
    res.write('Actualizando el plato: ' + req.params.dishId);
    res.end('Actualizamos el plato: '+ req.body.name +' con los detalles '+req.body.description);
})
.delete((req,res,next) => {
    res.end('Eliminaremos el plato: '+req.params.dishId);
});

module.exports = dishRouter;
