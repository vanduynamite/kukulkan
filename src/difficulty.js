import {
  ALIEN_INTERVAL_LEVELS,
  ALIEN_HEALTH_LEVELS,
  ALIEN_SPEED_LEVELS,
  ALIEN_SPEEDS,
  BULLET_RADIUS_STRENGTH
} from './settings';

export const calculateDifficulty = (game) => {
  game.difficulty = Math.floor(game.kills / game.killsPerLevel);
  game.addAlienInterval = calculateAlienInterval(game.difficulty);
};

const calculateAlienInterval = (difficulty) => {
  const levels = ALIEN_INTERVAL_LEVELS;

  switch (true) {
    case (difficulty <= levels[0]):
      return 3500;
    case (difficulty <= levels[1]):
      return 2700 - difficulty * 200;
    case (difficulty <= levels[2]):
      return 2300 - difficulty * 100;
    case (difficulty <= levels[3]):
      return 1800 - difficulty * 50;
    case (difficulty <= levels[4]):
      return 1350 - difficulty * 25;
    default:
      return 600;
  }
};

export const alienHealth = (difficulty) => {
  const levels = ALIEN_HEALTH_LEVELS;
  const r = Math.random();

  switch (true) {
    case (difficulty <= levels[0]):
      return 1;
    case (difficulty <= levels[1]):
      if (r > 0.75) return 2;
      return 1;
    case (difficulty <= levels[2]):
      if (r > 0.5) return 2;
      return 1;
    case (difficulty <= levels[3]):
      if (r > 0.75) return 3;
      if (r > 0.5) return 2;
      return 1;
    default:
      if (r > 0.75) return 3;
      if (r > 0.25) return 2;
      return 1;
  }
};

export const alienSpeed = (difficulty) => {
  const levels = ALIEN_SPEED_LEVELS;
  const speeds = ALIEN_SPEEDS;
  const r = Math.random();

  switch (true) {
    case (difficulty <= levels[0]):
      return speeds[0];
    case (difficulty <= levels[1]):
      if (r > 0.75) return speeds[1];
      return speeds[0];
    case (difficulty <= levels[2]):
      if (r > 0.5) return speeds[1];
      return speeds[0];
    case (difficulty <= levels[3]):
      if (r > 0.75) return speeds[2];
      if (r > 0.25) return speeds[1];
      return speeds[0];
    case (difficulty <= levels[4]):
      if (r > 0.5) return speeds[2];
      return speeds[1];
    case (difficulty <= levels[5]):
      if (r > 0.75) return speeds[3];
      if (r > 0.25) return speeds[2];
      return speeds[1];
    default:
      if (r > 0.5) return speeds[3];
      return speeds[2];
  }
};

export const bulletStrength = (radius) => {
  const radii = BULLET_RADIUS_STRENGTH;
  switch (true) {
    case (radius <= radii[0]):
      return 0.5;
    case (radius <= radii[1]):
      return 1;
    default:
      return 2;
  }
};
