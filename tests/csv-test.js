import csv from 'csv-parser';
import fs, { link } from 'fs';

console.log("Lets CSV imput");
const route = './data/Pruebas.csv'
/*
let Tusers = []
let Tpass = []
let Tlink = []
let Tcomment = []
*/
/*
let MadeIt = (users, pass, link, comment, myRoute) => {
    fs.createReadStream(myRoute) // Lee el archivo CSV
  .pipe(csv()) // Pasa el flujo al parser CSV
  .on('data', (row) => {
    users.push(row.users);
    pass.push(row.pass);
    link.push(row.link);
    comment.push(row.comment);
  })
  .on('end', () => {
    console.log('Archivo CSV procesado con éxito');
  });
}
*/
//module.exports = { MadeIt}
