const API_URL = 'https://instabyte-back-imersao-807011187654.southamerica-east1.run.app/posts';

// Função para buscar os dados do endpoint
export default async function fetchImages() {
  try {
    const response = await fetch(API_URL); // Usando a URL diretamente
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}
