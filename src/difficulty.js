

export const calculateDifficulty = (game) => {
  console.log(game.score);
  game.difficulty = Math.floor(game.score / 5);
  game.addAlienInterval = calculateAlienInterval(game.difficulty);
  console.log(game.addAlienInterval);
};

const calculateAlienInterval = (difficulty) => {
  switch (true) {
    case (difficulty === 0):
      return 3500;
    case (difficulty === 1):
      return 2500;
    case (difficulty < 4):
      return 2000;
    case (difficulty < 8):
      return 1500;
    case (difficulty < 12):
      return 1000;
    default:
      return 500;
  }
};
