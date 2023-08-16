const cron = require('node-cron');
require('dotenv').config();
const config = require('../utils/config');
const { today, daysAgo } = require('../utils/dateUtils');
const mongoose = require('mongoose');
const { loader } = require('../controllers/articlesController');

/* Pipeline:
    $match articles older than 20 days
    $project article categories
    $merge into oldArticles collection */
const oldArticlesPipeline = [
  {
    $match: {
      date: { $lt: daysAgo(10).date },
    },
  },
  {
    $project: {
      _id: 1,
      url: 1,
      author: 1,
      category: 1,
      content: 1,
      date: 1,
      description: 1,
      img: 1,
      source: 1,
      title: 1,
    },
  },
  {
    $merge: {
      into: 'oldArticles',
      whenMatched: 'replace',
      whenNotMatched: 'insert',
    },
  },
];

async function removeOldest() {
  try {
    console.log('Executing oldArticlesPipeline');

    mongoose.set('strictQuery', false);
    const Conn = mongoose.createConnection();

    await Conn.openUri(config.MONGODB_URI);
    const collection = Conn.collection('newsmodels');

    //Executes pipeline
    const result = await collection.aggregate(oldArticlesPipeline).toArray();

    //Removes matched articles from source collection
    const deleteResult = await collection.deleteMany({
      date: { $lt: daysAgo(10).date },
    });

    console.log(JSON.stringify(result));
    console.log(
      `${deleteResult.deletedCount} documents removed from the source collection.`,
    );
  } finally {
    //Close connection to database
    mongoose.connection.close();
  }
}

async function refreshArticles() {
  await loader();
}

module.exports = {
  refreshArticles,
  removeOldest,
};
