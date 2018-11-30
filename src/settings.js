
export const START_SCORE = 0;


// how much leeway the hitboxes have
export const PLAYER_BUFFER = 10; // higher is easier
export const BULLET_BUFFER = 5; // higher is harder. can go negative.


// difficulty

export const KILLS_PER_LEVEL = 5;

export const ALIEN_INTERVAL_LEVELS = [
  0, // 3500 rate
  4, // 2700 - 200n rate
  10, // 2500 - 100n rate
  18, // 1800 - 50n rate (at level = 11, 1250 rate)
  30, // 1350 - 25n rate
      // 600 rate
];

export const ALIEN_HEALTH_LEVELS = [
  2, // all weak
  4, // 75% weak, 25% hearty
  8, // 50% weak, 50% hearty
  14, // 50% weak, 25% hearty, 25% strong
      // 25% weak, 50% hearty, 25% strong
];

export const ALIEN_SPEED_LEVELS = [
  0, // all slow
  1, // 75% slow, 25% medium
  6, // 50% slow, 50% medium
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
export const NUM_SIZES = 10;
export const FORM_INTERVAL = MAX_FORM_TIME / (NUM_SIZES - 1);
export const bulletVelX = (direction, radius) => {
  return direction * Math.pow(radius, 1.25) * 0.01;
};

export const bulletColor = (strength) => {
  switch (strength) {
    case 0.5:
      return '#27349a';
    case 1:
      return '#b540e4';
    case 2:
      return '#eb2a67';
  }
};



// Game dimensions
export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 540;
export const PLAYER_WIDTH = 40;
export const BULLET_HEIGHT = 160;
export const ALIEN_WIDTH = 40;
export const ALIEN_HEIGHT = 60;
