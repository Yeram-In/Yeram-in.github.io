// ********
// VARIABLES
// ********
// Start page:
const start_btn = document.getElementById('start-btn');
const screens = document.querySelectorAll('.screen');
const audio_btn = document.querySelectorAll('.btn-audio');
const restart_btn = document.getElementById('restart-btn');
const reset_btn = document.getElementById('reset-btn');
const pause_start_btn = document.getElementById('pause-start-btn');
// ********
// EVENT LISTENERS
// ********
// Start of the game
start_btn.addEventListener('click', () => {
  screens[0].classList.add('up');
  setGame();
});

function setGame() {
  audio_btn.forEach((btn) => {
    let aud = btn.querySelector('audio');
    aud.pause();
    aud.currentTime = 0;
    if (aud.id === 'audio-layer1') {
      aud.volume = 1;
      btn.classList.add('active');
    } else {
      aud.volume = 0;
      btn.classList.remove('active');
    }
    aud.play();
  });
}

function pauseAllTracks() {
  audio_btn.forEach((btn) => {
    btn.querySelector('audio').pause();
  });
}

function playAllTracks() {
  audio_btn.forEach((btn) => {
    btn.querySelector('audio').play();
  });
}

audio_btn.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) {
      console.log(`Deactivate ${btn.classList}`);
      btn.classList.remove('active');
      btn.querySelector('audio').volume = 0;
    } else {
      console.log(`Activate ${btn.classList}`);
      btn.classList.add('active');
      btn.querySelector('audio').volume = 1;
    }
  });
});

restart_btn.addEventListener('click', () => {
  audio_btn.forEach((btn) => {
    let aud = btn.querySelector('audio');
    aud.currentTime = 0;
    aud.play();
  });
});

reset_btn.addEventListener('click', () => {
  setGame();
});

pause_start_btn.addEventListener('click', (e) => {
  if (e.target.classList.contains('pause')) {
    console.log('Pause => Play');
    pauseAllTracks();
    e.target.classList.remove('pause');
    e.target.classList.add('play');
    e.target.innerText = 'Play';
  } else {
    playAllTracks();
    console.log('Play => Pause');
    e.target.classList.add('pause');
    e.target.classList.remove('play');
    e.target.innerText = 'Pause';
  }
});

const WHITE_KEYS=['y', 'x', 'c', 'v', 'b', 'n','m']
const BLACK_KEYS=['s', 'd','g', 'h','j']
const keys= document.querySelectorAll('.key')
const whiteKeys= document.querySelectorAll('.key.white')
const blackKeys= document.querySelectorAll('.key.black')

keys.forEach(key => {
	key.addEventListener('click', () => playNote(key))
})

document.addEventListener('keydown', e=> {
	if (e.repeat) return
	const key= e.key
	const whiteKeyIndex = WHITE_KEYS.indexOf(key)
	const blackKeyIndex = BLACK_KEYS.indexOf(key)
	
	if(whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
	if(blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
})
function playNote(key){
	const noteAudio=document.getElementById(key.dataset.note)
	noteAudio.currentTime=0
	noteAudio.play()
	key.classList.add('active')
	noteAudio.addEventListener('ended', ()=>{
		key.classList.remove('active')
	})
}

