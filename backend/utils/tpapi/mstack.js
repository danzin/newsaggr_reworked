const axios = require('axios');
const { newTestCollection } = require('../../models/news');
const { today, daysAgo } = require('../dateUtils');
export const mediastackLatest = async (categories, lang, countries) => {
  !countries && countries === 'us,bg';

  const response = axios.get(
    `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_API}&sources=${categories}&countries=${countries}`,
  );
};
