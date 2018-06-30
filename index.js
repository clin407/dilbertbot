var schedule = require('node-schedule'),
    slackNotify = require('slack-notify');
function getFormattedDate(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  
  return year + '/' + month + '/' + day + '/';
}
/**
 * @name getSlackOptions
 * @description Returns options that are necessary to send a Slack message
 *              Formats text to include current date in ISO8601 format
 * @returns {Object} Options to send a Slack message
 */
function getSlackOptions() {
  var channel = 'general',
      comicUrl = 'https://www.gocomics.com/calvinandhobbes/',
      unfurlLinks = true,
      username = 'CalvinAndHobbes';

  return {
    channel: channel,
    icon_url: iconUrl,
    text: [comicUrl, getFormattedDate(new Date())].join(''),
    unfurl_links: unfurlLinks,
    username: username
  };
}

/**
 * @name Send
 * @description Sends a message to Slack with options
 */
function send() {
  var options = getSlackOptions(),
      slack = slackNotify(process.env.SLACK_WEBHOOK_URL);

  slack.send(options);
}

// Sends a message daily at 15:00 UTC
schedule.scheduleJob('0 15 * * *', send);
