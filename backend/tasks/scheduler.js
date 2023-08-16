const cron = require('node-cron');
const { refreshArticles, removeOldest } = require('./refreshArticles');

//1 hour
cron.schedule('* 1 * * *', refreshArticles);

//45mins
// cron.schedule('45 * * * *', removeOldest);

//5secs
// cron.schedule('5 * * * * *', removeOldest);
