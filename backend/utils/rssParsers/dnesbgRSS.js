const Parser = require('rss-parser'); // Add this line to import the rss-parser packageconst axios = require('axios');
const { newTestCollection } = require('../../models/news');
const axios = require('axios');
const { downloadImageBuffer } = require('../getImageBuffer');

const dnesbgRSS = async () => {
  const feeds = {
    latest: 'https://www.dnes.bg/rss.php?today',
    bulgaria: 'https://www.dnes.bg/rss.php?cat=1',
    business: 'https://www.dnes.bg/rss.php?cat=3',
    tech: 'https://www.dnes.bg/rss.php?cat=4',
    crime: 'https://www.dnes.bg/rss.php?cat=6',
    world: 'https://www.dnes.bg/rss.php?cat=2',
  };
  for (const feed in feeds) {
    try {
      const response = await axios.get(feeds[feed]);
      const rssData = response.data;
      const parser = new Parser();
      const feedData = await parser.parseString(rssData);
      for (const item of feedData.items) {
        const { date, title, link, enclosure, content } = item;
        const betfilter = /winbet/i;
        const filter = { url: link };

        //Skipping winbet advertisements
        if (betfilter.test(title)) {
          console.log(`Skipped article with title: ${title}`);
          continue; // Skip this article and go to the next one
        }
        if (enclosure.url) {
          try {
            // Download the image buffer using the module function
            imgBuffer = await downloadImageBuffer(enclosure.url);
          } catch (error) {
            console.error('Error handling article:', enclosure.url);
            continue; // Skip this article if there was an error with the image download
          }
        }
        const update = {
          $setOnInsert: {
            title: title,
            description: content,
            source: 'DnesBG',
            author: 'DnesBG',
            img: imgBuffer,
            imgUrl: enclosure.url,
            content: content,
            category: feed,
            date: date,
            language: 'bg',
          },
        };
        const options = { upsert: true };

        await newTestCollection.updateOne(filter, update, options);

        console.log(`Article saved to MongoDB: ${title}`);
      }
      console.log('RSS feed parsed successfully!');
    } catch (error) {
      console.error('Error downloading or parsing RSS feed:', error);
    }
  }
};

module.exports = { dnesbgRSS };
