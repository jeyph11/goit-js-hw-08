import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayerElement = document.getElementById('vimeo-player');
const player = new VimeoPlayer(vimeoPlayerElement);

const saveCurrentTime = (time) => {
  localStorage.setItem('videoplayer-current-time', time);
};

const loadCurrentTime = () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  return savedTime ? parseFloat(savedTime) : 0;
};

const throttledSaveTime = throttle(saveCurrentTime, 1000); 
player.on('timeupdate', (data) => {
  const currentTime = data.seconds;
  throttledSaveTime(currentTime);
});

player.setCurrentTime(loadCurrentTime());

