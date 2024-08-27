import { Delete } from "./assets/page/Delete"
import { Index } from "./assets/page/Index"
import { Update } from "./assets/page/Update"

import { Routes, Route } from "react-router-dom"
import { Create } from "./assets/page/Create"
function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/delete/:id" element={<Delete />} />
        <Route path="/update/:id" element={<Update />} />
        
      </Routes>
    </>
  )
}

export default App
