// src/pages/DeleteAnimal.js
import { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import {  deleteAnimal } from "../services/delete";
import { getAnimalById } from "../services/Update";

export function Delete() {
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

  const handleDelete = async () => {
    try {
      await deleteAnimal(id);
      
      await Swal.fire({
        title: 'Success!',
        text: 'Animal deleted successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      navigate("/");
    } catch (error) {
      console.error("Error deleting animal:", error);

      await Swal.fire({
        title: 'Error!',
        text: 'Failed to delete animal.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (!animal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-8 text-xl font-bold">Delete Animal</h1>
      <div className="flex flex-col items-center w-full max-w-lg">
        <div className="mb-4 w-full">
          <Input
            type="text"
            label="Name"
            className="w-full"
            defaultValue={animal.name || ""}
            isDisabled
          />
        </div>
        <div className="mb-4 w-full">
          <Input
            type="text"
            label="Species"
            className="w-full"
            defaultValue={animal.species || ""}
            isDisabled
          />
        </div>
        <div className="mb-4 w-full">
          <Input
            type="text"
            label="Age"
            className="w-full"
            defaultValue={animal.age || ""}
            isDisabled
          />
        </div>
        <div className="mb-4 w-full">
          <Input
            type="text"
            label="Habitat"
            className="w-full"
            defaultValue={animal.habitat || ""}
            isDisabled
          />
        </div>
        <div className="mb-4 w-full">
          <Button
            color="danger"
            onClick={handleDelete}
            className="w-full"
          >
            Delete Animal
          </Button>
        </div>
      </div>
    </div>
  );
}
