import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe#vimeo-player');
const player = new Player(iframe);

const CURRENT_TIME = 'videoplayer-current-time';

const timeFunction = data => {
  const { seconds } = data;
  localStorage.setItem(CURRENT_TIME, seconds);
};

player.on('timeupdate', throttle(timeFunction, 1000));

const currentTime = localStorage.getItem(CURRENT_TIME);

player
  .setCurrentTime(currentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
