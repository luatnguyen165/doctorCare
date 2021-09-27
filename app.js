var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// database  connect mongodb, redis, elasticsearch 
var connect = require('./database/mongoDB');
connect();
const redisClient = require('./database/redis');
const checkConnection = require('./database/elasticsearch');
checkConnection();

// end database 
// khai báo route
var indexRouter = require('./routes/index');
var degreeRouter = require('./routes/degree');

var app = express();

// Phần này là của elasticsearch  và ví dụ
// học link này full text search nâng cao
// https://www.elastic.co/guide/en/elasticsearch//reference/current/query-dsl-multi-match-query.html
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://elasticsearch:9200' })
async function run () {
  // Let's start by indexing some data
  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Daenerys Targaryen',
      quote: 'I am Winter the blood of the dragon.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.'
    }
  })

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: 'game-of-thrones' })

  // Let's search!
  const { body } = await client.search({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        match: { quote: 'winter' }
      }
    }
  })

  console.log(body.hits.hits)
}

// run().catch(console.log)
// end elasticsearch

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors('*'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/danh-sach-users', indexRouter);
app.use('/danh-sach-bang-cap',degreeRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
