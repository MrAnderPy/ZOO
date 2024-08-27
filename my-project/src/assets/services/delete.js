
export async function deleteAnimal(id) {
    const response = await fetch(`http://127.0.0.1:5000/animals/${id}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete animal");
    }
  
    return response.json();
  }