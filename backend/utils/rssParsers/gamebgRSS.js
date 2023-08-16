const Parser = require('rss-parser');
const { newTestCollection } = require('../../models/news');

const axios = require('axios');
const { downloadImageBuffer } = require('../getImageBuffer');

async function gameBG() {
  const feed = 'https://www.game.bg/blog-feed.xml';

  try {
    // Download the RSS feed file using axios
    console.log(
      '-----------------',
      [feed],
      '------------------------------------',
    );
    const response = await axios.get(feed);
    const rssData = response.data;
    const parser = new Parser();

    const feedData = await parser.parseString(rssData);
    for (const item of feedData.items) {
      const {
        creator,
        title,
        link,
        pubDate,
        enclosure,
        content,
        contentSnippet,
      } = item;
      const filter = { url: link };

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
          source: 'GameBG',
          author: creator,
          img: imgBuffer,
          imgUrl: enclosure.url,
          content: content,
          category: 'gaming',
          date: pubDate,
          language: 'bg',
        },
      };
      const options = { upsert: true };

      await newTestCollection.updateOne(filter, update, options);

      console.log(`Article saved to MongoDB: ${title}`);
      // console.log(pubDate);
      // console.log(title);
      // console.log(link);
      // console.log(enclosure.url);
      // console.log(content);
      // console.log(contentSnippet);
      console.log(item);
      console.log('----------------------------------');
    }

    console.log('RSS feed parsed successfully!');
  } catch (error) {
    console.error('Error downloading or parsing RSS feed:', error.message);
  }
}
module.exports = { gameBG };
