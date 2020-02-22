console.log('Cliente JavaScript iniciado com sucesso.')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const menssagem1 = document.querySelector('#message-1')
const menssagem2 = document.querySelector('#message-2')

// menssagem1.textContent = ''
// menssagem2.textContent = ''

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const location = search.value
  menssagem1.textContent = 'Carregando...'
  menssagem2.textContent = ''

  fetch('http://localhost:3000/ptempo?endereco=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        menssagem1.textContent = data.error
      } else {
        menssagem1.textContent = data.local
        menssagem2.textContent = data.previsao.sumario + ' Temperatura: ' + data.previsao.temperatura + '. Probabilidade de chuva: ' + data.previsao.probabilidade_chuva + '.'
      }
    })
  })
})