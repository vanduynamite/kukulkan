

export const calculateDifficulty = (game) => {
  game.difficulty = Math.floor(game.score / 5);
  game.addAlienInterval = calculateAlienInterval(game.difficulty);
  console.log(`Score: ${game.score}, level: ${game.difficulty}`);
};

const calculateAlienInterval = (difficulty) => {
  const levels = [
    0, // 3500 rate
    4, // 2700 - 200n rate
    10, // 2500 - 100n rate
    18, // 1800 - 50n rate, at diff = 11, 1250 rate
    30,
  ];

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

  const r = Math.random();
  const levels = [
    2, // all weak
    4, // 75% weak, 25% hearty
    8, // 50% weak, 50% hearty
    14, // 50% weak, 25% hearty, 25% strong
        // 25% weak, 50% hearty, 25% strong
  ];

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
  // 0.03 slow, 0.06 medium, 0.1 fast, 0.15 very fast

  const r = Math.random();
  const levels = [
    0, // all slow
    1, // 75% slow, 25% medium
    6, // 50% slow, 50% medium
    12, // 25% slow, 50% medium, 25% fast
    15, // 50% medium, 50% fast
    20, // 25% medium, 50% fast, 25% v. fast
        // 50% fast, 50% v. fast
  ];

  switch (true) {
    case (difficulty <= levels[0]):
      return 0.03;
    case (difficulty <= levels[1]):
      if (r > 0.75) return 0.06;
      return 0.03;
    case (difficulty <= levels[2]):
      if (r > 0.5) return 0.06;
      return 0.03;
    case (difficulty <= levels[3]):
      if (r > 0.75) return 0.1;
      if (r > 0.25) return 0.06;
      return 0.03;
    case (difficulty <= levels[4]):
      if (r > 0.5) return 0.1;
      return 0.06;
    case (difficulty <= levels[5]):
      if (r > 0.75) return 0.15;
      if (r > 0.25) return 0.1;
      return 0.06;
    default:
      if (r > 0.5) return 0.15;
      return 0.1;
  }
};

export const alienColor = (health) => {
  switch (true) {
    case (health <= 1):
      return '#ffeb3b';
    case (health <= 2):
      return '#ffc107';
    case (health <= 3):
      return '#ff5722';
    default:
      return '#ffffff';
  }
};

export const bulletStrength = (radius) => {
  // Math.floor((this.radius - 1) / 14) + 1;
  switch (true) {
    case (radius < 6):
      return 0.5;
    case (radius < 14):
      return 1;
    default:
      return 2;
  }

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
