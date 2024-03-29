const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnection = require('./db-connection');
// const ejs = require('ejs')


// Import routers
const indexRouter = require('./routes/index');
const appRouter = require('./routes/app');
const truckRouter = require('./routes/truck');
const driverRouter = require('./routes/driver');
const statusRouter = require('./routes/status');
const orderRouter = require('./routes/order');
const roadRouter = require('./routes/road');
const pricingRouter = require('./routes/pricing');

const authenticate = require('./middleware/IsAdminMiddleware');
const adminUser = require('./models/adminUser');
const port = process.env.PORT || 3000;

// Enable CORS
// bu kodu domainle baglintidan sonra melumat cekmek ucundu
app.use(cors());
app.use(cors({ origin: ['https://gotruck.online', 'https://ride.gotruck.online'], credentials: true }));

// Parse request bodies as JSON
// burada limit google maps apiden gelen melumatin boyuk olmagina gore qoyulub
app.use(bodyParser.json({ limit: '10000kb' }));

// Use routers
app.use('/', indexRouter)
app.use('/app', appRouter)
app.use('/trucks', truckRouter)
app.use('/drivers', driverRouter)
app.use('/statuses', statusRouter)
app.use('/orders', orderRouter)
app.use('/roads', roadRouter)
app.use('/pricing', pricingRouter)

// Default route
// app.set('view engine', ejs);
app.get('/', (req, res) => {
  res.send('Xoş gəldiniz🥰!');
});

// Start the server
app.listen(port, () => {
  console.log(`You can access the server at http://localhost:${port}`);
});
