import React, {useState} from "react";
import Base from "../core/Base";

const AddBus = () => {

    const [first, setfirst] = useState();


    return (
        <Base
            title="Create New Bus"
            description="Create new bus routes by providing the details"
        ></Base>
    );
};
export default AddBus;
