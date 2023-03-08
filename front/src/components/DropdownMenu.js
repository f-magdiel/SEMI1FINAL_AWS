import { useState, useEffect } from "react";

function DropdownMenu(props) {

    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(props.options);
    }, [props.options])

    return (
        <div className="field">
            <label>{props.data}</label>
            <select multiple="" className="ui dropdown" onClick={props.change} name="id_file" required>
                <option value="">{props.placeholder}</option>
                {options.map((option) => {
                    return (
                        <option value={String(option.idAlbum)+"$"+option.public_state} key={option.idAlbum}>
                            {option.nameAlbum}
                        </option>
                    )
                })}
            </select>
        </div>
    );
}

export default DropdownMenu;