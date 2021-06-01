
start()

function start() {
 let k=0, tables=[
 {'tableName':'TotalPerBlock','object':TotalPerBlock},
 {'tableName':'ProportionalReward','object':ProportionalReward},
 {'tableName':'Workers','object':Workers},
 {'tableName':'Payments','object':Payments},
 {'tableName':'MatureBlocks','object':MatureBlocks},
 {'tableName':'ImmatureBlocks','object':ImmatureBlocks}
 ]
 for (k=0;k<tables.length;++k) {
  if (tables[k].object.length>0)
  {
   let i=0, j=0
   let table=[];
   let keys=Object.keys(tables[k].object[0]);
   table.push('<table><thead><tr>');
   for (i=0;i<keys.length;++i) {
    table.push('<th>'+nameException(keys[i])+'</th>');
   }
   table.push('</tr></thead><tbody>');
  
   for (i=0;i<tables[k].object.length;++i) {
    table.push('<tr>');
    for (j=0;j<keys.length;++j) {
     table.push('<td>'
     +valueException(keys[j],tables[k].object[i][keys[j]])
     +'</td>');
    }
    table.push('</tr>');
   }
  
   table.push('</tbody></table>');
   $('.'+tables[k].tableName).html(table.join(""));
  }
 }
}

function nameException(name)
{
 if (name==="hr") return 'Hashrate Médio';
 if (name==="timestamp") return 'Data Hora';
 if (name==="worker") return 'Minerador';
 return name
}

function valueException(name,value)
{
 if (name==="timestamp" || name==="lastBeat") {
  value=moment(value*1000).format('DD/MM/YYYY HH:mm')
 }
 return value
}

let realFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

Number.prototype.countDecimals = function () {
  if (Math.floor(this.valueOf()) === this.valueOf()) return 0
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
