// src/services/animalService.js

export async function getAnimalById(id) {
    const response = await fetch(`http://127.0.0.1:5000/animals/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch animal");
    }
    return response.json();
  }
  
  export async function updateAnimal(id, animalData) {
    const response = await fetch(`http://127.0.0.1:5000/animals/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animalData),
    });
  
    if (!response.ok) {
      throw new Error("Failed to update animal");
    }
  
    return response.json();
  }
  