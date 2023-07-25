function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

async function getResults(players) {
  for (let player of players) {
      try {
          let result = await luckyDraw(player);
          console.log(result);
      } catch (error) {
          console.log(error.message);
      }
  }
}

let players = ['Tina', 'Jorge', 'Julien'];

getResults(players);
