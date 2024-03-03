import { useState } from "react";
import ModalContainer from "../modal/modalContainer";
import Form from "./form";
import { GrContact } from "react-icons/gr";

const ContactMe = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="relative group px-1 text-orange-500"
            >
                <GrContact />
                <span className="absolute w-40 -bottom-10 z-20 transform -translate-x-1/2 scale-0 rounded bg-white p-2 text-stone-900 text-center font-bold transition duration-200 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-100">
                    Get In Contact
                </span>
            </button>
            <ModalContainer open={open} setOpen={setOpen}>
                <Form />
            </ModalContainer>
        </>
    )
};

export default ContactMe;