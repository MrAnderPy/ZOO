import { Input, Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado
import { createAnimal } from "../services/post";
export function Create() {
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Obtiene los valores de los campos del formulario
    const { name, species, age, habitat } = event.target.elements;

    try {
      await createAnimal("http://127.0.0.1:5000/animals",{
        name: name.value,
        species: species.value,
        age: age.value,
        habitat: habitat.value,
      });

      // Muestra una alerta de éxito
      await Swal.fire({
        title: 'Success!',
        text: 'Animal created successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      // Limpia el formulario
      event.target.reset();

      // Redirige a la página principal
      navigate("/");
    } catch (error) {
      console.error("Error creating animal:", error);

      // Muestra una alerta de error
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to create animal.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <h1 className="mt-12 mb-2 mx-12 bg-blue-500 p-4 rounded-lg">Add new animal 7w7</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-screen border-4 mx-52">
        <div className="mb-4 w-1/2">
          <Input
            type="text"
            name="name"
            label="Name"
            className="w-full"
          />
        </div>
        <div className="mb-4 w-1/2">
          <Input
            type="text"
            name="species"
            label="Species"
            className="w-full"
          />
        </div>
        <div className="mb-4 w-1/2">
          <Input
            type="text"
            name="age"
            label="Age"
            className="w-full"
          />
        </div>
        <div className="mb-4 w-1/2">
          <Input
            type="text"
            name="habitat"
            label="Habitat"
            className="w-full"
          />
        </div>
        <div className="mb-4 w-1/2">
          <Button type="submit" color="primary" className="w-full">Save animal</Button>
        </div>
      </form>
    </>
  );
}
