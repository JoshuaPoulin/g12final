require('dotenv').load();
var express = require('express');
var router = express.Router();
var pg = require('pg')
var conString = process.env.DATABASE_URL || 'postgres://@localhost/gazette'
var async = require('async')

/* GET home page. */
router.post('/new', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO articles(title, link, imageurl, summary) VALUES($1, $2, $3, $4) returning id', [req.body.user.title, req.body.user.link, req.body.user.imageurl, req.body.user.summary], function(err, result){
      done();
      console.log(result);
      res.status(200).json(result)
      if(err){
        return console.error('error running query', err);
      }
      console.log('connected to database');
    })
  })
})
router.get('/home', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM articles', function(err, result){
      done();
      console.log(result.rows);
      res.json(result.rows);
      if(err){
        return console.error('error running query', err);
      }
      console.log('connected to database');
    })
  })
})
router.get('/views', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    if(err){
      console.log('error fetching client from pool', err);
    }
    async.parallel([
      function(cb){
        client.query('SELECT * FROM articles', function(err, result){

          cb(err, result.rows)
        })
      },
      function(cb){
        client.query('SELECT * FROM opinions', function(err, result){
          cb(err, result.rows)
        })
      }
    ],
    function(err, result){
      done();
      if(err){
        console.log('error performing query', err)
      }
      res.json(result)
    })
  })
})
router.post('/add', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO opinions(articles_id, opinion) VALUES($1, $2) returning id', [req.body.user.id, req.body.user.opinion], function(err, result){
      done();
      console.log(result);
      res.status(200).json(result)
      if(err){
        return console.error('error running query', err);
      }
      console.log('connected to database');
    })
  })
})
router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  });
});

module.exports = router;
