const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Utilizando função Express
const app = express()

// Definindo rotas para a aplicação
const publicPath = path.join(__dirname, '../public')
const partialPath = path.join(__dirname, '../views/partials')

// Configurando os Handlebars - app.set('views, viewPath') // configurar outro caminho para Views.
app.set('view engine', 'hbs')
app.use(express.static(publicPath))
hbs.registerPartials(partialPath)

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Rafael Guidi'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Rafael Guidi'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Rafael Guidi',
    helpText: 'Informe a localização no campo busca que o aplicativo irá informar a Previsão do Tempo.'
  })
})

app.get('/ptempo', (req, res) => {
  if (!req.query.endereco) {
    return res.send({
      error: 'Você deve informar a localização.'
    })
  }

  geocode(req.query.endereco, (error, { latitude, longitude, local } = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        local: local,
        previsao: forecastData,
        endereco: req.query.endereco
      })
    })
  })

})


app.get('/*', (req, res) => {
  res.render('pageError', {
    title: 'Error',
    name: 'Rafael Guidi',
    error: 'Página não encontrada'
  })
})

app.listen(3000, () => {
  console.log('Aplicação rodando...')
})