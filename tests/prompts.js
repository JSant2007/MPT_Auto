import readlineSync from 'readline-sync';
import { getChatResponse } from './deepseek.js';
import fs from 'fs';

let page = readlineSync.question(`1: MPT \n2: GORE\n3: R1\n`)

let postContent = fs.readFileSync('./data/post.txt', 'utf8');

let postContext = fs.readFileSync('./data/context.txt', 'utf8');

const CommentPerPersonality = [];
for (let i = 1; i <= 7; i++) {
    const personality = readlineSync.question(`Ingrese el numero de comentarios para la personalidad ${i}: `);

    if (isNaN(personality)) {
        throw new Error("Ingrese un numero valido");
    }

    CommentPerPersonality.push(personality);
}

if (page == 1) {
    page = `Analiza el contenido de este post de la página de facebook de la Municipalidad Provincial de Tacna (Perú), te voy a dar la cantidad de comentarios para cada personalidad según la escala:
Personalidad 1: ${CommentPerPersonality[0]}
Personalidad 2: ${CommentPerPersonality[1]}
Personalidad 3: ${CommentPerPersonality[2]}
Personalidad 4: ${CommentPerPersonality[3]}
Personalidad 5: ${CommentPerPersonality[4]}
Personalidad 6: ${CommentPerPersonality[5]}
Personalidad 7: ${CommentPerPersonality[6]}

Cada comentario debe parecer emitido por una persona distinta en rangos de edad desde los 18 a los 60 años y de géneros variados, por lo que debes variar la forma de escribir, la personalidad de la persona que escribe, la ortografía, no debe de usar emojis ni hashtags. Las personalidades 5, 6 y 7, deben ser un poco más agresivas, siendo la 7 incluso ofensiva a veces. Dame solamente los comentarios, uno por cada línea y ten en cuenta el contexto. Cada comentario debe estar en una linea aparte y no debe mencionarse de que personalidad es.
Contexto: ${postContext}

Publicación: ${postContent}`
} else if (page == 2) {
    page = `
    Analiza el contenido de este post de la página de facebook del Gobierno Regional de Tacna (Perú). ​Luis Torres Robledo, exalcalde de Tacna y actual gobernador regional, ha enfrentado diversas acusaciones legales. En 2022, se ordenó el embargo de sus bienes debido a su presunta participación en la organización criminal "Los Limpios de Tacna", acusada de vender terrenos municipales de forma irregular y direccionar licitaciones. Además, en enero de 2023, la Corte de Tacna dispuso que Torres cumpliera arresto domiciliario por su presunta vinculación con dicha organización. En octubre de 2024, se declaró prescrito un delito de colusión relacionado con hechos de 2007, lo que llevó a la cancelación de sus antecedentes por este caso. ​Te voy a dar la cantidad de comentarios para cada personalidad según la escala:
Personalidad 1: ${CommentPerPersonality[0]}
Personalidad 2: ${CommentPerPersonality[1]}
Personalidad 3: ${CommentPerPersonality[2]}
Personalidad 4: ${CommentPerPersonality[3]}
Personalidad 5: ${CommentPerPersonality[4]}
Personalidad 6: ${CommentPerPersonality[5]}
Personalidad 7: ${CommentPerPersonality[6]}

Cada comentario debe parecer emitido por una persona distinta en rangos de edad desde los 18 a los 60 años y de géneros variados, por lo que debes variar la forma de escribir, la personalidad de la persona que escribe, la ortografía, no debe de usar emojis ni hashtags. Las personalidades 5, 6 y 7, deben ser un poco más agresivas, siendo la 7 incluso ofensiva a veces. Dame solamente los comentarios, uno por cada línea y ten en cuenta el contexto. Cada comentario debe estar en una linea aparte y no debe mencionarse de que personalidad es.
Contexto: ${postContext}

Publicación: ${postContent}
    `
} else if (page == 3) {
    page = `
    Analiza el contenido de este post de la página de facebook de Radio Uno de Tacna (Perú), esta radio ya es comúnmente conocida como "La radio de la corrupción", por lo que el 50% de veces que se refieran a ella debe ser con ese apodo. Dame solamente los comentarios, uno por cada línea, ten en cuenta el contexto y también que sean variados, intenta que no se repita más de 1 vez el mismo comentario. Ten en cuenta que las palabras "corrupción" y "corrupto" están censuradas en esta página, por lo que hay que escribirlas de formas alternativas para que el filtro no las detecte, pero sin que deje de leerse corrupción, puedes variar con usar números en vez de algunas letras y poner asteríscos en medio de las letras. Te voy a dar la cantidad de comentarios para cada personalidad según la escala:
Personalidad 1: ${CommentPerPersonality[0]}
Personalidad 2: ${CommentPerPersonality[1]}
Personalidad 3: ${CommentPerPersonality[2]}
Personalidad 4: ${CommentPerPersonality[3]}
Personalidad 5: ${CommentPerPersonality[4]}
Personalidad 6: ${CommentPerPersonality[5]}
Personalidad 7: ${CommentPerPersonality[6]}

Cada comentario debe parecer emitido por una persona distinta en rangos de edad desde los 18 a los 60 años y de géneros variados, por lo que debes variar la forma de escribir, la personalidad de la persona que escribe, la ortografía, no debe de usar emojis ni hashtags. Las personalidades 5, 6 y 7, deben ser un poco más agresivas, siendo la 7 incluso ofensiva a veces. Dame solamente los comentarios, uno por cada línea y ten en cuenta el contexto. Cada comentario debe estar en una linea aparte y no debe mencionarse de que personalidad es.

Contexto: ${postContext}

Publicación: ${postContent}
`
}

const res = await getChatResponse(page);
console.log(res);
fs.writeFileSync('./data/res.txt', res);
console.log("Comentarios generados y guardados en res.txt");