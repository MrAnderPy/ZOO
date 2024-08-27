import { Tab } from "../components/Tab"
import {Button} from "@nextui-org/react";
import Footer from "../components/Footer";
export function Index(){
    return(
        <>
        <div >
            <h1 className="mt-12 ml-36 bg-blue-300 rounded-lg mr-36 text-lg">The ZOO of Andersson 7w7</h1>
        <a href="/Create">
        <Button color="primary" className="mt-4 ml-36">Add new animal</Button>
        </a>
        </div>
        <div className="p-24">
        <Tab/>
        </div>
        <Footer/>
        </>

    )
}