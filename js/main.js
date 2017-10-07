// play__button--main If clicked it will dissapear and video begins to play. Also from now on,
// on hover video player controls will translate in.

const videoWrapper = document.querySelector('.video__wrapper');
const video = videoWrapper.querySelector('.video__element');
const playerControls = document.querySelector('.video__controls');
const playButtonMain = document.querySelector('.play__button--main');
const playButton = playerControls .querySelector('.play__pause');
const replayButton = playerControls.querySelector('.replay');
const muteButton = playerControls.querySelector('.volume__mute');
const volumeSlider = playerControls.querySelector('.volume__slider');
const progress = playerControls.querySelector('.progress');
const progressBar = playerControls.querySelector('.progress__bar--controls');
const fullScreen = playerControls.querySelector('.full__screen');
const transcript = document.querySelectorAll('.transcript');

// play/pause function
function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
    playButton.classList.remove('play__pause');
    playButton.classList.add('pause__play');
  } else {
    video.pause();
    playButton.classList.remove('pause__play');
    playButton.classList.add('play__pause');
  }
}

// progress bar function
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progress.style.width = '${percent}%';
}

// progress bar slider function
function slider(e) {
  const sliderTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = sliderTime;
}


// checking if browser supports <video> tag
var supportsVideo = !!document.createElement('video').canPlayType;
if (supportsVideo) {
   // Hide the default controls
   video.controls = false;
   // set up custom controls
   // ...
   // main play button settings
   playButtonMain.addEventListener('click', (e) => {
     videoWrapper.removeChild(playButtonMain);
     video.play();
     playButton.classList.remove('play__pause');
     playButton.classList.add('pause__play');
   });
   // player controls - play/pause buttons
   playButton.addEventListener('click', togglePlay);
   // player controls - replay button
   replayButton.addEventListener('click', ()=> {
     video.currentTime = 0;
   });
   // player controls = volume/mute buttons
   muteButton.addEventListener('click', (e)=> {
     if (e.target.tagName == 'BUTTON') {
       if (video.volume > 0.0) {
         muteButton.classList.remove('volume__mute');
         muteButton.classList.add('mute__volume');
         video.volume = 0.0;
       } else {
         muteButton.classList.remove('mute__volume');
         muteButton.classList.add('volume__mute');
         video.volume = 1;
       }
     }
   });

   // player controls = volume slider
   volumeSlider.addEventListener("change", () => {
   // Update the video volume
    video.volume = volumeSlider.value;
  });
  // player controls - full-screen button
  fullScreen.addEventListener("click", () => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen(); // Firefox
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen(); // Chrome and Safari
    }
  });
   // player controls - progress bar
   video.addEventListener('timeupdate', function() {
     if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
     progress.value = video.currentTime;
     progress.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
   });
   video.addEventListener('timeupdate', handleProgress);
   let mousedown = false;
   progressBar.addEventListener('click', slider);
   progressBar.addEventListener('mousemove', (e) => mousedown && slider(e)); // if mouse is 'down', slider function will run!
   progressBar.addEventListener('mousedown', () => mousedown = true);
   progressBar.addEventListener('mouseup', () => mousedown = false);

   // transcript highlighting
   video.addEventListener("timeupdate", () => {
     let videoTime = video.currentTime;
     function toggleHighlight(n) {
			// Removed highlight from any unclicked text
			for (var i = 0; i < transcript.length; i += 1) {
				transcript[i].classList.remove("highlight");
			}
			//Add highlighted class
			transcript[n].classList.add('highlight');
		}
     console.log(videoTime);
     if (videoTime > 0 && videoTime < 4.13) {
			toggleHighlight(0);
		} else if (videoTime > 4.13 && videoTime < 7.535) {
			toggleHighlight(1);
		} else if (videoTime > 7.535 && videoTime < 11.27) {
			toggleHighlight(2);
		} else if (videoTime > 11.27 && videoTime < 13.96) {
			toggleHighlight(3);
		} else if (videoTime > 13.96 && videoTime < 17.94) {
			toggleHighlight(4);
		} else if (videoTime > 17.94 && videoTime < 22.37) {
			toggleHighlight(5);
		} else if (videoTime > 22.37 && videoTime < 26.88) {
			toggleHighlight(6);
		} else if (videoTime > 26.88 && videoTime < 32.1) {
			toggleHighlight(7);
		} else if (videoTime > 32.1 && videoTime < 34.73) {
			toggleHighlight(8);
		} else if (videoTime > 34.73 && videoTime < 39.43) {
			toggleHighlight(9);
		} else if (videoTime > 39.43 && videoTime < 42.35) {
			toggleHighlight(10);
		} else if (videoTime > 42.35 && videoTime < 46.3) {
			toggleHighlight(11);
		} else if (videoTime > 46.3 && videoTime < 49.27) {
			toggleHighlight(12);
		} else if (videoTime > 49.27 && videoTime < 53.76) {
			toggleHighlight(13);
		} else if (videoTime > 53.76 && videoTime < 57.78 ) {
			toggleHighlight(14);
		}
  });
  // clicking on the transcript for exceeded expectation grade
  for (i = 0; i < transcript.length; i += 1) {
    transcript[i].addEventListener('click', (e) => {
      let highlightClickTime = e.target.dataset.start;
      video.currentTime = highlightClickTime;
    });
  }
}
