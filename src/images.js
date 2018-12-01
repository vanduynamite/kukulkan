

const buildAlienImages = () => {

  const aliens = {
    alien3: { img: new Image() },
    alien2: { img: new Image() },
    alien1: { img: new Image() },
    alien3Backwards: { img: new Image() },
    alien2Backwards: { img: new Image() },
    alien1Backwards: { img: new Image() },
  };

  aliens.alien3.img.src = './dist/assets/alien3.png';
  aliens.alien3.frames = 8;
  aliens.alien3.start = 0;
  aliens.alien3.width = 200;
  aliens.alien3.height = 175;
  aliens.alien3.row = 2;
  aliens.alien3.sideBuffer = 55;
  aliens.alien3.bottomBuffer = 28;

  aliens.alien2.img.src = './dist/assets/alien2.png';
  aliens.alien2.frames = 4;
  aliens.alien2.start = 0;
  aliens.alien2.width = 165;
  aliens.alien2.height = 150;
  aliens.alien2.row = 2;
  aliens.alien2.sideBuffer =  10;
  aliens.alien2.bottomBuffer = 50;

  aliens.alien1.img.src = './dist/assets/alien1.png';
  aliens.alien1.frames = 6;
  aliens.alien1.start = 0;
  aliens.alien1.width = 150;
  aliens.alien1.height = 120;
  aliens.alien1.row = 2;
  aliens.alien1.sideBuffer = 0;
  aliens.alien1.bottomBuffer = 11;

  aliens.alien3Backwards.img.src = './dist/assets/alien3_backwards.png';
  aliens.alien3Backwards.frames = 8;
  aliens.alien3Backwards.width = 200;
  aliens.alien3Backwards.start = 1658 - 200;
  aliens.alien3Backwards.height = 175;
  aliens.alien3Backwards.row = 2;
  aliens.alien3Backwards.sideBuffer = -35;
  aliens.alien3Backwards.bottomBuffer = 28;

  aliens.alien2Backwards.img.src = './dist/assets/alien2_backwards.png';
  aliens.alien2Backwards.frames = 4;
  aliens.alien2Backwards.width = 165;
  aliens.alien2Backwards.start = 911 - 165;
  aliens.alien2Backwards.height = 150;
  aliens.alien2Backwards.row = 2;
  aliens.alien2Backwards.sideBuffer = -25;
  aliens.alien2Backwards.bottomBuffer = 50;

  aliens.alien1Backwards.img.src = './dist/assets/alien1_backwards.png';
  aliens.alien1Backwards.frames = 6;
  aliens.alien1Backwards.width = 150;
  aliens.alien1Backwards.start = 1220 - 150;
  aliens.alien1Backwards.height = 120;
  aliens.alien1Backwards.row = 2;
  aliens.alien1Backwards.sideBuffer = -30;
  aliens.alien1Backwards.bottomBuffer = 11;

  return aliens;
};

export const alienImages = buildAlienImages();
