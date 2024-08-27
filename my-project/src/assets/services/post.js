export async function createAnimal(url,animalData) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animalData),
    });
  
    if (!response.ok) {
      throw new Error("Failed to create animal");
    }
  
    return response.json(); // Devuelve la respuesta en formato JSON si la petición es exitosa
  }
  