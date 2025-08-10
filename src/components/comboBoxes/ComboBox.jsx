import React, {useState, useEffect} from 'react'
import styles from "../../assets/styles/comboBox.module.css"

const ComboBox = ({ id, onChange, value}) => {

    const [status, setStatus]  = useState(value || "");

    useEffect(() => {
        setStatus(value || "");
    }, [value]);

    const handleChange = (e) => {
        setStatus(e.target.value);
        if (onChange) onChange(e.target.value);
    }

    return (
        <>
            <select
                id={id}
                value={status}
                onChange={handleChange}
                className={styles.combo}
            >
                <option value="">Seleccione...</option>
                <option value="TODAS">TODAS</option>
                <option value="PENDIENTE">PENDIENTE</option>
                <option value="PROGRESO">PROGRESO</option>
                <option value="COMPLETADA">COMPLETADA</option>
            </select>
        </>
    )
}

export default ComboBox 