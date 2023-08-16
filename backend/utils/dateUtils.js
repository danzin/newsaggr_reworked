const daysAgo = (days) => {
  var date = new Date();
  date.setDate(date.getDate() - days);

  // Convert the date to ISO string
  var isoDateString = date.toISOString();

  // Extract the date part without the time
  var beautifulDate = isoDateString.slice(0, 10);

  return { date, beautifulDate };
};

const today = () => {
  var date = new Date();
  var isoDateString = date.toISOString();
  var beautifulDate = isoDateString.slice(0, 10);

  return { date, beautifulDate };
};
module.exports = {
  daysAgo,
  today,
};
