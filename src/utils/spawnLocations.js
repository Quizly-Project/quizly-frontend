const spawnLocations = matName => {
  let spawn = {
    x: 0,
    y: 10,
    z: 0,
  };

  // console.log('matmat', matName);
  switch (matName) {
    case 'M_Turtle':
      spawn = {
        x: -20,
        y: 10,
        z: -10,
      };
      break;

    case 'M_Tuna':
      spawn = {
        x: -10,
        y: 10,
        z: -10,
      };
      break;

    case 'M_Seagull':
      spawn = {
        x: 0,
        y: 10,
        z: -10,
      };
      break;

    case 'M_Sardine':
      spawn = {
        x: 10,
        y: 10,
        z: -10,
      };
      break;

    case 'M_Salmon':
      spawn = {
        x: 20,
        y: 10,
        z: -10,
      };
      break;

    case 'M_Prawn':
      spawn = {
        x: -20,
        y: 10,
        z: 0,
      };
      break;

    case 'M_Octopus':
      spawn = {
        x: -10,
        y: 10,
        z: 0,
      };
      break;

    case 'M_Jellyfish':
      spawn = {
        x: 0,
        y: 10,
        z: 0,
      };
      break;

    default:
      spawn = {
        x: -35,
        y: 10,
        z: 10,
      };
      break;
  }

  return spawn;
};

export default spawnLocations;
