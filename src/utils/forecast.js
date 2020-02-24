const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/86334dba56bd159c687fbfdc5a7ba92e/' + latitude + ',' + longitude + '?units=si&lang=pt'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Erro de comunicação com o serviço de Tempo. ' + error, undefined)
        } else if (body.error) {
            callback('Não foi possível encontrar o local informado.', undefined)
        } else {
            callback(undefined, {
                icone: body.daily.data[0].icon,
                sumario: body.daily.data[0].summary,
                temperatura: body.currently.temperature,
                probabilidade_chuva: parseFloat((body.currently.precipProbability * 100).toFixed(2)) + '%'
            })
        }
    })
}

module.exports = forecast