const request = require('request')

const geocode = (endereco, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(endereco) + '.json?access_token=pk.eyJ1IjoicmFmYWd1aWRpIiwiYSI6ImNrNW1wZjZ6ZDEyMXQzbW83MWd4emRjankifQ.XSPWvEJGiu1DouclNamj2A&limit=1&language=pt'

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Não foi possível conectar com o servidor', undefined)
    } else if (body.features.length === 0) {
      callback('Não foi possível encontrar a previsão do local informado.', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0],
        local: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode