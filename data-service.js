const fs = require('fs').promises;
const path = require('path');


function initialize() {
  return Promise.all([
    fs.readFile('./data/vehicles.json', 'utf8')
      .then((data) => JSON.parse(data))
      .catch((err) => {
        throw new Error(`Unable to read vehicles file}`);
      }),
    fs.readFile('./data/brands.json', 'utf8')
      .then((data) => JSON.parse(data))
      .catch((err) => {
        throw new Error(`Unable to read brands file}`);
      })
  ])
    .then(([vehicles, brands]) => {
      return { vehicles, brands };
    })
    .catch((err) => {
      throw new Error(`Data initialization fail}`);
    });
}


function getAllVehicles() {
  return initialize()
    .then((data) => {
      if (data.vehicles.length === 0) {
        throw new Error('No results returned');
      }
      return data.vehicles;
    });
}


function get2023Vehicles() {
  return initialize()
    .then((data) => {
      const vehicles2023 = data.vehicles.filter((vehicle) => vehicle.year === 2023);
      if (vehicles2023.length === 0) {
        throw new Error('No results returned');
      }
      return vehicles2023;
    });
}


function getBrands() {
  return initialize()
    .then((data) => {
      if (data.brands.length === 0) {
        throw new Error('No results returned');
      }
      return data.brands;
    });
}

module.exports = {
  getAllVehicles,
  get2023Vehicles,
  getBrands,
  initialize,
};