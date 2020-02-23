console.log('Cliente JavaScript iniciado com sucesso.')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const icone = document.querySelector('#icon-weather')
const menssagem1 = document.querySelector('#message-1')
const menssagem2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const location = search.value
  icone.style.display = 'none'
  menssagem1.textContent = 'Carregando...'
  menssagem2.textContent = ''

  fetch('/ptempo?endereco=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        menssagem1.textContent = data.error
      } else {
        icone.src = '/img/' + data.previsao.icone + '.svg'
        icone.style.display = 'block'
        menssagem1.textContent = data.local
        menssagem2.textContent = data.previsao.sumario + ' Temperatura: ' + data.previsao.temperatura + '. Probabilidade de chuva: ' + data.previsao.probabilidade_chuva + '.'
      }
    })
  })
})