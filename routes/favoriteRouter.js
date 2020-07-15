const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Favorites = require('../models/favorite');
const Dishes = require('../models/dishes');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verfyUser, (req,res,next) => {
    Favorites.findOne({ user: req.user._id })
    .populate('user')
    .populate('dishes')
    .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, authenticate.verfyUser,(req,res,next) => {
Favorites.findOne({user: req.user._id}, (err, favor) => {
    if(err) return next(err);
    if(favor) {
        req.body.dishes.forEach((dishId) => {
            if(!favor.dishes.includes(dishId)){
                favor.dishes.push(dishId);
            }            
        });
        favor.save()
        .then((favor) => {
             console.log('Favorite updated with the new dishes', favor);
             res.statusCode = 200;
             res.setHeader('Content-Type','application/json');
             res.json(favor);
        }, (err) => next(err))
        .catch((err) => next(err))
    }
    else{
        Favorites.create({
            user: req.user._id,
            dishes: [...req.body._id]
        })
        .then((favorite) => {        
            console.log('Favorite created', favorite);
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(favorite);
           }, (err) => next(err))
           .catch((err) => next(err))
    }
});      
})
.delete(cors.corsWithOptions, authenticate.verfyUser,(req,res,next) => {
    Favorites.deleteOne({user: req.user._id}, (err, favorite) => {
        if(err) return next(err);
        if(favorite){
            console.log('Favorite remove', favorite);
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(favorite);
        }
    })
});

favoriteRouter.route('/:dishId')
.post(cors.corsWithOptions, authenticate.verfyUser,(req,res,next) => {
    Favorites.findOne({user: req.user._id}, (err, favor) => {
        if(err) return next(err);
        if(favor){
            if(!favor.dishes.includes(req.params.dishId)){
                favor.dishes.push(req.params.dishId)
                favor.save()
                .then((favor) => {
                    console.log('Favorite added', favor);
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json(favor);
                }, (err) => next(err))
                .catch((err) => next(err));
            }
            else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json(favor);
            }
        }
        else{
            Favorites.create({
                user: req.user._id,
                dishes:[req.params.dishId]
            })
            then((favor) => {
                console.log('Favorite added', favor);
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(favor);
            }, (err) => next(err))
            .catch((err) => next(err))
        }
    });
})
.delete(cors.corsWithOptions, authenticate.verfyUser,(req,res,next) => {
    Favorites.findOne({user: req.user._id}, (err, favor) => {
        if(err) return next(err);
        if(favor){
            if(favor.dishes.includes(req.params.dishId)){
                favor.dishes.pull(req.params.dishId)
                favor.save()
                .then((favor) => {
                    console.log('Favorite deleted', favor);
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json(favor);
                }, (err) => next(err))
                .catch((err) => next(err));
            }
        }
        else{
            err = new Error('Dish' + req.params.dishId + ' not found in your favorites');
            err.statusCode = 404;
            return next(err); 
        }
    })
});

module.exports = favoriteRouter;