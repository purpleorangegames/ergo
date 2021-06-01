
let realFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

Number.prototype.countDecimals = function () {
  //if (Math.floor(this.valueOf()) === this.valueOf()) return 0
  return this.toString().split('.')[0].length || 0
}

const maximumCharacters = (number, characters) => {
  return number.toFixed(characters - number.countDecimals())
}

const calculateHashVolume = (hashrate) => {
  let result = { 'hash': 0, 'type': '' }

  let auxHashrate = hashrate
  let hashIdentifierList = ['h/s', 'kH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s', 'EH/s', 'ZH/s']
  let i = 0

  for (i = 0; auxHashrate > 1000; ++i) {
    auxHashrate /= 1000
  }

  result['hash'] = auxHashrate
  result['type'] = hashIdentifierList[i]

  return result
}
