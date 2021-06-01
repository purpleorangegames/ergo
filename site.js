
let lastTimestamp=''
let useBorder=false
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
   
   let lineTr=''
   for (i=0;i<tables[k].object.length;++i) {
    lineTr=lineTr+('<tr|BORDER|>');
    
    for (j=0;j<keys.length;++j) {
     lineTr=lineTr+('<td'+styleException(keys[j])+'>'
     +valueException(tables[k].tableName,keys[j],tables[k].object[i][keys[j]])
     +'</td>');
    }
    lineTr=lineTr+('</tr>');
    
    lineTr=lineTr.replace('|BORDER|',((useBorder)?' class="topBorder"':''));
    if (useBorder)
     useBorder=false;
    
    table.push(lineTr);
    lineTr=''
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
   if (value!==lastTimestamp) {
    lastTimestamp=value;
    useBorder=true;
   }
   else
    value=""
  }
 }
 else if (name==="hr") {
  let hash=calculateHashVolume(value);
  value=maximumCharacters(hash.hash,5)+' '+hash.type
 }
 return value
}
