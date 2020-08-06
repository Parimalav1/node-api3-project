const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());
// server.use(morgan('common'));
server.use(logger);

//url = /api/users 👈💥
//server.use('/api/users', verify('velcum!'), userRouter);
server.use('/api/users', userRouter);
server.get('/', auth, (req, res) =>{
  res.status(200).send('Welcome users');
});
//custom middleware

function logger(req, res, next) {
  req.name = req.body.name;
  // console.log(`${req.name} made a function ${req.method} at ${req.url}`);
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
    'Origin'
  )}`);
  next();
};

function verify(password) {
  return function logger(req, res, next) {
    if (req.headers.authorization === password) {
      next();
    } else {
      res.status(404).json({ message: 'Please enter correct password' });
    }
  }
};

function auth(req, res, next) {
  if(req.url === '/api/users') {
    next();
  } else {
    res.send('Others are not allowed')
  }
};

// module.exports = server;
server.listen(4000, () => {
  console.log('\n* Server Running on http://localhost:4000 *\n');
});
