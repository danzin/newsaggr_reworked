const app = require('./app');
const { info } = require('./utils/logger');
require('dotenv').config();

const { PORT } = process.env;
const hostname = '192.168.1.10';

app.listen(PORT, hostname, () => {
  info(`Server running on http://${hostname}:${PORT}/`);
});
