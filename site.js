
let k=0, tables=[
{'tableName':'TotalPerBlock','object':TotalPerBlock},
{'tableName':'ProportionalReward','object':ProportionalReward},
{'tableName':'Payments','object':Payments},
{'tableName':'MatureBlocks','object':MatureBlocks},
{'tableName':'ImmatureBlocks','object':ImmatureBlocks}
]
for (k=0;k<tables.length;++k) {
 if (tables[k].object.length>0)
 {
  let table=[];
  let keys=Object.keys(tables[k].object[0]);
  table.push('<table><thead><tr>');
  table.push('<th>'+keys.join('</th><th>')+'</th>');
  table.push('</tr></thead><tbody>');
 
  let i=0, j=0
  for (i=0;i<tables[k].object.length;++i) {
   table.push('<tr>');
   for (j=0;j<keys.length;++j) {
    table.push('<td>'+tables[k].object[i][keys[j]]+'</td>');
   }
   table.push('</tr>');
  }
 
  table.push('</tbody></table>');
  $('.'+tables[k].tableName).html(table.join(""));
 }
}
