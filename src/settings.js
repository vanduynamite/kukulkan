import {
  alienImages,
  bulletImages,
} from './images';

// 1 = insane
// 2 = hard
// 3 = normal
// 4 = easy
// 5 = beginner
// it's about 30 seconds per level
export const KILLS_PER_LEVEL = 3;
export const START_SCORE = 0;
export const DRAW_HITBOXES = false;
export const PLAYER_CAN_DIE = true;


// how much leeway the hitboxes have
export const PLAYER_BUFFER = 10; // higher is easier
export const BULLET_BUFFER = 5; // higher is harder. can go negative.


// difficulty ramp
export const ALIEN_INTERVAL_LEVELS = [
  0, // 3500 rate
  4, // 2700 - 200n rate
  10, // 2500 - 100n rate
  18, // 1800 - 50n rate (at level = 11, 1250 rate)
  30, // 1350 - 25n rate
      // 600 rate
];

export const ALIEN_HEALTH_LEVELS = [
  1, // all weak
  3, // 75% weak, 25% hearty
  7, // 50% weak, 50% hearty
  14, // 50% weak, 25% hearty, 25% strong
      // 25% weak, 50% hearty, 25% strong
];

export const ALIEN_SPEED_LEVELS = [
  0, // all slow
  1, // 75% slow, 25% medium
  5, // 50% slow, 50% medium
  12, // 25% slow, 50% medium, 25% fast
  15, // 50% medium, 50% fast
  20, // 25% medium, 50% fast, 25% v. fast
      // 50% fast, 50% v. fast
];

// 0.03 slow, 0.06 medium, 0.1 fast, 0.15 very fast
export const ALIEN_SPEEDS = [
  0.03,
  0.06,
  0.1,
  0.15,
];

export const BULLET_RADIUS_STRENGTH = [
  5, // less than this, strength 0.5
  13, // less than this, strength 1
      // strength 2
];


// bullet settings
export const START_RADIUS = 4;
export const GRAVITY = 0.0004;
export const MAX_BULLETS = 4;
export const MAX_SIZE = 20;
export const MAX_FORM_TIME = 1000;
export const NUM_SIZES = 7;
export const FORM_INTERVAL = MAX_FORM_TIME / (NUM_SIZES - 1);
export const bulletVelX = (direction, radius) => {
  return direction * Math.pow(radius, 1.25) * 0.01;
};

export const bulletSpriteMap = (radius, frame) => {

  const step = MAX_SIZE / 7;

  // return bulletImages.bullet3;

  switch (true) {
    case (radius < 1 * step):
      return bulletImages.bullet1;
    case (radius < 2 * step):
      return bulletImages.bullet2;
    case (radius < 3 * step):
      return bulletImages.bullet3;
    case (radius < 4 * step):
      return bulletImages.bullet4;
    case (radius < 5 * step):
      return bulletImages.bullet5;
    case (radius < 6 * step):
      return bulletImages.bullet6;
    case (frame <= 15):
      return bulletImages.bullet7;
    case (frame <= 30):
      return bulletImages.bullet8;
    case (frame <= 45):
      return bulletImages.bullet9;
    case (frame <= 60):
      return bulletImages.bullet8;
  }
};

export const alienSpriteMap = (health, direction, dead) => {

  switch (true) {
    case (health <= 1 && dead):
      return direction === -1 ? alienImages.alien3 : alienImages.alien3Backwards;
    case (health <= 1):
      return direction === -1 ? alienImages.alien3 : alienImages.alien3Backwards;
    case (health <= 2 && dead):
      return direction === -1 ? alienImages.alien1dying : alienImages.alien1BackwardsDying;
    case (health <= 2):
      return direction === -1 ? alienImages.alien1 : alienImages.alien1Backwards;
    case (health <= 3 && dead):
      return direction === -1 ? alienImages.alien2 : alienImages.alien2Backwards;
    case (health <= 3):
      return direction === -1 ? alienImages.alien2 : alienImages.alien2Backwards;
    default:
      return direction === -1 ? alienImages.alien3 : alienImages.alien3Backwards;
  }
};


export const GAME_WIDTH = 960;

// Pyramid dimensions
export const PYR_BOTTOM = 450;
export const PYR_LEFT = 80;
export const PYR_DY = 80;
const PYR_SLOPES = 3;
export const PYR_DX = (GAME_WIDTH - 2 * PYR_LEFT) / (PYR_SLOPES * 4 - 1);

// Game dimensions
export const GAME_HEIGHT = 540;
export const PLAYER_WIDTH = 40;
export const PLAYER_HEIGHT = 80;
export const PLAYER_BASE_HEIGHT = PYR_BOTTOM - PYR_DY * PYR_SLOPES - PLAYER_HEIGHT;
export const BULLET_HEIGHT = PLAYER_BASE_HEIGHT + 0.35 * PLAYER_HEIGHT;
export const ALIEN_WIDTH = 52;
export const ALIEN_HEIGHT = 80;
