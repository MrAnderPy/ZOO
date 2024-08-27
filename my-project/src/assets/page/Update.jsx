// src/pages/UpdateAnimal.js
import { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { getAnimalById, updateAnimal } from "../services/Update";

export function Update() {
  const { id } = useParams(); // Obtiene el ID de la URL
  const [animal, setAnimal] = useState(null); // Inicializa como null para mostrar un estado de carga

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const data = await getAnimalById(id);
        setAnimal(data);
      } catch (error) {
        console.error("Error fetching animal:", error);
      }
    };
    fetchAnimal();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, species, age, habitat } = event.target.elements;

    try {
      await updateAnimal(id, {
        name: name.value,
        species: species.value,
        age: age.value,
        habitat: habitat.value,
      });

      await Swal.fire({
        title: 'Success!',
        text: 'Animal updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      navigate("/");
    } catch (error) {
      console.error("Error updating animal:", error);

      await Swal.fire({
        title: 'Error!',
        text: 'Failed to update animal.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  // Muestra un mensaje de carga si los datos aún no están disponibles
  if (!animal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-8 text-xl font-bold">Update Animal</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-lg">
        <div className="mb-4 w-full">
          <Input
            type="text"
            name="name"
            label="Name"
            className="w-full"
            defaultValue={animal.name || ""}
          />
        </div>
        <div className="mb-4 w-full">
          <Input
            type="text"
            name="species"
            label="Species"
            className="w-full"
            defaultValue={animal.species || ""}
          />
        </div>
        <div className="mb-4 w-full">
          <Input
            type="text"
            name="age"
            label="Age"
            className="w-full"
            defaultValue={animal.age || ""}
          />
        </div>
        <div className="mb-4 w-full">
          <Input
            type="text"
            name="habitat"
            label="Habitat"
            className="w-full"
            defaultValue={animal.habitat || ""}
          />
        </div>
        <div className="mb-4 w-full">
          <Button type="submit" color="warning" className="w-full">Update Animal</Button>
        </div>
      </form>
    </div>
  );
}
