import axios from "axios";
import dotenv from "dotenv";


dotenv.config();

const apiKey = process.env.API_KEY

// El contenido del post que deseas analizar
const postContent = 'dame una frase prometedora';
const baseUrl = 'https://openrouter.ai/api/v1';

// Realizar la solicitud para crear el chat
export async function getChatResponse(postContent) {
  try {
    // Realizar una solicitud POST a la API
    const response = await axios.post(
      `${baseUrl}/chat/completions`, 
      {
        model: "deepseek/deepseek-r1:free",
        messages: [
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
    console.log("Respuesta:", response.data.choices[0].message.content);
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
}