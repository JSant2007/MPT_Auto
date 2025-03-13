import fs from 'fs';
import csv from 'csv-parser';


let content = '';

const ReadCSV = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream('./data/Pruebas.csv')
        .pipe(csv())
        .on('data', (row) => {
            content = row.content;
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            resolve();
        })
        .on('error', reject);
    });
}

const WriteFile = () => {
    for (let i = 0; i < array.length; i++) {
        fs.appendFileSync('./data/logs/Informe.txt', `
            ${array[i]}
        `);
        
    }
}