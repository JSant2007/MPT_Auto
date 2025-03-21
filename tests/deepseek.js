import axios from "axios";
import dotenv from "dotenv";


dotenv.config();

const apiKey = process.env.API_KEY

// El contenido del post que deseas analizar
const baseUrl = 'https://openrouter.ai/api/v1';

// Realizar la solicitud para crear el chat
export async function getChatResponse(postContent) {
  const personality = `1.Super fan de la página, incluso llega a ser un poco obsesivo: Comenta siempre, defiende a la página ante cualquier crítica, comparte todo lo que publican y está al tanto de cada detalle.

2.Fan entusiasta: Le encanta la página, comenta frecuentemente con tono positivo y apoya las iniciativas, pero no llega a ser obsesivo.

3.Positivo pero crítico: Apoya las publicaciones y proyectos, pero no duda en señalar aspectos que podrían mejorar o en pedir más transparencia.

4.Neutral positivo: Le gusta la página, comenta de vez en cuando con un tono amable, pero no se involucra demasiado.

5.Neutral con tendencia crítica: No es fan ni hater, pero suele hacer comentarios constructivos o preguntas incómodas que buscan claridad.

6.Crítico negativo: No le gusta la página, hace comentarios sarcásticos o de descontento, pero sin llegar a ser extremista.

7.Negativo absoluto (hater): Odia la página, siempre comenta con tono agresivo, despectivo o sarcástico, y busca desacreditar todo lo que publican.`
  try {
    // Realizar una solicitud POST a la API
    const response = await axios.post(
      `${baseUrl}/chat/completions`, 
      {
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "system",
            content: `${personality}`
          },
          {
            role: "user",
            content: `${postContent}`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Mostrar la respuesta de la API
    let res = response.data.choices[0].message.content;
    return res;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
}