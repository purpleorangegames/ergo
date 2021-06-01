
let lastTimestamp=''
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
     table.push('<td'+styleException(keys[j])+'>'
     +valueException(tables[k].tableName,keys[j],tables[k].object[i][keys[j]])
     +'</td>');
    }
    table.push('</tr>');
   }
  
   table.push('</tbody></table>');
   $('.'+tables[k].tableName).html(table.join(""));
  }
 }
}

function styleException(name) {
 if (name==='timestamp') return ' class="timestamp" ';
 return '';
}

function nameException(name)
{
 if (name==="hr") return 'Hashrate Médio';
 if (name==="timestamp") return 'Data Hora';
 if (name==="worker") return 'Minerador';
 return name
}

function valueException(table,name,value)
{
 if (name==="timestamp") {
  value=moment(value*1000).format('DD/MM/YYYY HH:mm')
  if (table==="Workers") {
   if (value!==lastTimestamp)
    lastTimestamp=value
   else
    value=""
  }
 }
 else if (name==="hr") {
  let hash=calculateHashVolume(value);
  value=hash.hash+' '+hash.type
 }
 return value
}
