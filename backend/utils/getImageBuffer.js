// imageDownloader.js
const axios = require('axios');

const downloadImageBuffer = async (url) => {
  try {
    const imageResponse = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    return Buffer.from(imageResponse.data, 'binary');
  } catch (error) {
    console.error('Error downloading image:', url);
    throw error; // Rethrow the error to handle it in the main code
  }
};

module.exports = { downloadImageBuffer };
