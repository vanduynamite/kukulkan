# Kukulkan
Kukulkan is a JavaScript browser game based on [Action Button Entertainment's][abe_wiki] [ZiGGURAT][ziggurat_wiki].

Try the game live [here][kukulkan_live]!

![kukulkan_screenshot](https://github.com/vanduynamite/kukulkan/blob/master/screenshots/kukulkan_screenshot_focus.png)

## Gameplay
Aliens walk from the edges of the screen up the temple. The game ends if any of them touch you.

You can blast the aliens with your magic though - hold the left or right arrow key (or click on the screen and hold) to charge up your gun, then release to fire the shot. The longer you hold the key, the more powerful the shot.

## Features

### Mobile Support
Try opening the live site on a mobile device! Tapping and holding on the left or right of the canvas will charge the shot and everything else works as expected!

![kukulkan_mobile](https://github.com/vanduynamite/kukulkan/blob/master/screenshots/kukulkan_mobile.png)

### Settings and Difficulty
All major calculations are dependent on variables in the `settings.js` file. For instance, the pyramid height, width, and step widths are based on four variables `PYR_DX`, `PYR_DY`, `PYR_LEAD`, and `PYR_BASE`. If these are adjusted, the entire pyramid would change shape and the game would adjust accordingly.

Similarly, the difficulty of the game is based on arrays in `settings.js` that store alien healths, alien speeds, alien generation interval, bullet strength, bullet size, and hitbox buffers. The `difficulty.js` file in turn contains switch statements that choose the appropriate array value from `settings.js` based on the number of kills and the difficulty level.

``` JavaScript
export const alienSpeed = (difficulty) => {
  const levels = Settings.ALIEN_SPEED_LEVELS;
  const speeds = Settings.ALIEN_SPEEDS;
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
```
### Alien Position
A side effect of using `requestAnimationFrame` is that calculations are paused when the window is not active. This is generally good, but some adjustments had to be made for the position of the aliens. In a first iteration, the Y-position of the aliens was based on the time passed, which caused them to go higher than they should have when the page was not active. In the end this was corrected by using some equations to ensure an alien's Y-position is dependent on its X-position.

``` JavaScript
step(gameTime) {
  const dt = gameTime - this.timeCreated;
  this.left = this.leftStart + this.speed * dt;

  const toe = this.left + Settings.ALIEN_WIDTH * 0.5;
  const halfGameWidth = Settings.GAME_WIDTH / 2;
  const base = halfGameWidth - (halfGameWidth - Settings.PYR_LEAD) * this.dir;
  const numSections = Math.max((toe - base) / Settings.PYR_DX * this.dir, 0);
  const numLevelsUp = Math.ceil(Math.floor(numSections) / 2);
  const dxUpSlope = numSections % 2 > 1 ? 0 : numSections % 2;
  const baseBottom = Settings.PYR_BASE - Settings.ALIEN_HEIGHT;

  this.bottom =  baseBottom - (numLevelsUp + dxUpSlope) * Settings.PYR_DY;
}
```

## Code
### GameLoop
The game is rendered on a JavaScript canvas element. Entering from the `index.js` file, the program sets a `Game` and `GameLoop` element, and then leaves the rest to the `GameLoop`.

The `constructor` function of `GameLoop` builds all the interactions the user could use, including the user facing settings (Sound, Music, Difficulty, and Hitboxes), click to start the game, and controls for charging the player's shot. The choice to include these last controls on `GameLoop` instead of `Game` is keep all the event listeners in the same place.

When the game is started, settings on the `Game` instance are set appropriately (`score = 0` etc), and `requestAnimationFrame` is called. This will call the `animate` function which tells the `Game` to `step` and then calls another `requestAnimationFrame` unless the `Game` has ended.

``` JavaScript
animate(time) {
  this.frame = (this.frame + 1) % 60;
  this.game.step(time, this.ctx, this.frame);
  this.updateScore();

  if (this.game.gameover) {
    this.endGame();
  } else {
    requestAnimationFrame(this.animate.bind(this));
  }
}
```

### Game
The `Game` class does three main things:
1. Steps each object
2. Checks for collisions
3. Adds new bullets (based on user input) and new aliens(based on game timer)

#### Step
The `step` function is the entry to `Game`. It first loops through every object that `Game` contains, including all `Bullet`s, `Alien`s, and the `Player`. Each one of these classes is in their own file, and duck-typed so that each can have `object.step` called on it.

`step` then calls `draw`, which much like `step` relies on duck-typing to draw each object in the canvas.

``` JavaScript
draw(ctx, frame) {
  ctx.clearRect(0, 0, Settings.GAME_WIDTH, Settings.GAME_HEIGHT);
  this.drawPyramid(ctx);
  this.allObjects().forEach(obj => obj.draw(ctx, frame));
}
```
Lastly, `step` checks for collisions and then adds new aliens and bullets.

## Credit

Inspiration for the game from [Action Button Entertainment's][abe_wiki] [ZiGGURAT][ziggurat_wiki].

Sounds and sprites are provided by [Open Game Art][opengameart].

The name [Kukulkan][kukulkan_wiki] is the Mayan serpent god from which the aliens in this game take their form. The name is also a callout to the original game, as ziggurats are one name for the classic Mesoamerican stepped pyramid.


[ziggurat_wiki]: https://en.wikipedia.org/wiki/Ziggurat_(video_game)
[abe_wiki]: https://en.wikipedia.org/wiki/Action_Button_Entertainment
[kukulkan_wiki]: https://en.wikipedia.org/wiki/Kukulkan
[kukulkan_live]: https://vanduynamite.github.io/kukulkan/
[opengameart]: https://opengameart.org/
