import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";
import Modal from "./Modal";

const Details = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [_, setAdoptedPet] = useContext(AdoptedPetContext);
    const { id } = useParams();
    const results  = useQuery(["details", id], fetchPet);

    if(results.isLoading){
        return(
            <div className="loading-pane">
                <h2 className="loader">🌀</h2>
            </div>
        );
    }

    const pet = results.data.pets[0];

    return (
        <div className="">
            <Carousel images={pet.images} />
            <div className="mt-10 mx-auto mb-0 bg-orange-200">
                <h1 className="text-2xl text-center">{pet.name}</h1>
                <h2 className="text-lg flex flex-col justify-center items-center">
                    <p className="font-bold">{pet.animal}</p> 
                    {pet.breed} - {pet.city}, {pet.state}
                    <button className="rounded px-6 py-2 color text-white hover:opacity-50 border-none bg-orange-500 block justify-center" onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
                    <p className="w-11/12">{pet.description}</p>
                    {showModal ?
                        (
                            <Modal>
                                <div>
                                    <h1>Would you like to adopt {pet.name}?</h1>
                                    <div className="buttons">
                                        <button onClick={() => {
                                            setAdoptedPet(pet);
                                            navigate("/");
                                        }}>Yes</button>
                                        <button onClick={() => setShowModal(false)}>No</button>
                                    </div>
                                </div>
                            </Modal>
                        ) : null}
                </h2>
            </div>
        </div>
    );
};

function DetailsErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    )
}
  
export default DetailsErrorBoundary;