import * as Settings from './settings';

export const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export const scoreKill = (alien, killsPerLevel) => {
  const multiplier = 6 - killsPerLevel;
  const speedLevel = Settings.ALIEN_SPEEDS.indexOf(Math.abs(alien.speed));
  return multiplier * (alien.originalHealth + speedLevel + 1) * 5;
};
