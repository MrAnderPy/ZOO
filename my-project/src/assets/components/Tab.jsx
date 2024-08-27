import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Link } from "react-router-dom";
import {Button} from "@nextui-org/react";
import { get } from "../services/get";
export function Tab() {
    const [animals, setAnimals] = useState([]); 

    useEffect(() => {
        get("http://127.0.0.1:5000/animals")
            .then(data => setAnimals(data)) 
            .catch(error => console.error("Error:", error));
    }, []); 

    return (
       
        <Table aria-label="Animal Table"className="max-w-6xl" >
            <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>SPECIES</TableColumn>
                <TableColumn>AGE</TableColumn>
                <TableColumn>HABITAT</TableColumn>
                
                <TableColumn>UPDATE</TableColumn>
                <TableColumn>DELETE</TableColumn>
                
            </TableHeader>
            <TableBody>
        {animals.map((animal) => (
          <TableRow key={animal._id}>
            <TableCell>{animal.name}</TableCell>
            <TableCell>{animal.species}</TableCell>
            <TableCell>{animal.age}</TableCell>
            <TableCell>{animal.habitat}</TableCell>
            <TableCell>
              <Link to={`/update/${animal._id}`}>
                <Button color="warning">Update</Button>
              </Link>
            </TableCell>
            <TableCell>
              <Link to={`/delete/${animal._id}`}>
                <Button color="danger">Delete</Button>
              </Link>
            </TableCell>
          
          </TableRow>
        ))}
      </TableBody>
        </Table>
    );
}
