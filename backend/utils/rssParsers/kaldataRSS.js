const Parser = require('rss-parser'); // Add this line to import the rss-parser packageconst axios = require('axios');
const { NewsModel, newTestCollection } = require('../../models/news');
const axios = require('axios');
const { downloadImageBuffer } = require('../getImageBuffer');
const kaldataRSS = async () => {
  const rssFeedUrl = 'https://www.kaldata.com/feed';
  const imageUrlRegex = /<img[^>]+src="([^">]+)"/i;
  try {
    const response = await axios.get(rssFeedUrl);
    const rssData = response.data;
    const parser = new Parser();
    const feed = await parser.parseString(rssData);

    for (const item of feed.items) {
      const {
        title,
        categories,
        creator,
        pubDate,
        contentSnippet,
        content,
        link,
      } = item;
      const match = imageUrlRegex.exec(content);
      const imageUrl = match ? match[1] : null;
      const filter = { url: link };
      console.log(imageUrl);
      let imgBuffer = null; // Initialize imgBuffer to null before downloading

      if (imageUrl) {
        try {
          // Download the image buffer using the module function
          imgBuffer = await downloadImageBuffer(imageUrl);
        } catch (error) {
          console.error('Error handling article:', link);
          continue; // Skip this article if there was an error with the image download
        }
      }

      const update = {
        $setOnInsert: {
          title: title,
          description: contentSnippet,
          source: 'Kaldata',
          author: creator,
          img: imgBuffer,
          imgUrl: imageUrl,
          content: contentSnippet,
          category: categories[0],
          date: pubDate,
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
};

module.exports = { kaldataRSS };
