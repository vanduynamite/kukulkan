import {
  SOUND_ON,
  BULLET_RADIUS_STRENGTH
} from './settings';


class SoundEffect {

  constructor(src, volume) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute('controls', 'none');
    this.sound.style.display = 'none';
    this.sound.volume = volume || '0.35';
    document.body.appendChild(this.sound);
  }

  play() {
    this.sound.currentTime = 0;
    if (SOUND_ON) this.sound.play();
  }

  stop() {
    this.sound.pause();
    return true;
  }

}

export const soundEffects = () => {
  const sounds = {
    music: new SoundEffect('./dist/assets/music.wav', '0.25'),
    gameOver: new SoundEffect('./dist/assets/game_over.wav', '0.35'),
    chargeUp: new SoundEffect('./dist/assets/charge_up.mp3', '0.35'),
    smallLaunch: new SoundEffect('./dist/assets/small_launch.wav', '0.2'),
    mediumLaunch: new SoundEffect('./dist/assets/med_launch.wav', '0.35'),
    largeLaunch: new SoundEffect('./dist/assets/large_launch.wav', '0.4'),
    hurt1: new SoundEffect('./dist/assets/hurt1.wav', '0.9'),
    hurt2: new SoundEffect('./dist/assets/hurt2.wav', '0.85'),
    hurt3: new SoundEffect('./dist/assets/hurt3.wav', '0.4'),
    dead1: new SoundEffect('./dist/assets/dead1.wav', '0.6'),
    dead2: new SoundEffect('./dist/assets/dead2.wav', '0.7'),
    dead3: new SoundEffect('./dist/assets/dead3.wav', '0.5'),
    playerDeath: new SoundEffect('./dist/assets/player_death.wav', '0.5'),
  };

  sounds.music.sound.loop = true;
  sounds.chargeUp.sound.loop = true;

  return sounds;

};
