import React from 'react';
// const Twitter = require('twitter');
//
// const client = new Twitter({
//   consumer_key: '48DkyRVGvgpmYQEaon5NEusXC',
//   consumer_secret: 'bzTiQTtLwkQRaTrFvSJ46SVuOIOi3DUe9peXHi2VzYdhsKbYG8',
//   access_token_key: '2278390080-yaqBfPVwTXK4yC7z538O07NzDUIFzXHiNtlmiKn',
//   access_token_secret: 'Yyp0vxVzJw5KAG68ha1Nlf54ghwWKJTXWYVItIT4o0VSr'
// });

const Tweets = (props) => {
  twttr.widgets.createTimeline(
    {
      sourceType: 'profile',
      screenName: props.twitterUserName,
    },
    document.getElementById('tweetWidget')
  );
  return (
    <div></div>
  );
};

export default Tweets;
