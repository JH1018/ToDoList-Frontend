import React, { useState } from 'react';
import Button from '../Button';
import styles from "../../assets/styles/forms.module.css";
import TaskStatusComboBox from '../comboBoxes/TaskStatusComboBox';
import useCreateTask from '../../shared/hooks/useCreateTask';
import toast from 'react-hot-toast';
import {
    validateDescription,
    validateDescriptionMessage,
    validateTitle,
    validateTitleMessage
} from "../../shared/validators";

const CreateTaskForm = ({ onClose, onSuccess }) => {
    const { createTask, loading, error } = useCreateTask();

    const [formState, setFormState] = useState({
        title: { value: "", isValid: false, showError: false },
        description: { value: "", isValid: false, showError: false },
        dueDate: { value: "", isValid: false, showError: false },
        status: { value: "PENDIENTE", isValid: true, showError: false }
    });

    const handleInputValueChange = (value, field) => {
        setFormState(prev => ({
            ...prev,
            [field]: { ...prev[field], value }
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case "title":
                isValid = validateTitle(value);
                break;
            case "description":
                isValid = validateDescription(value);
                break;
            case "dueDate":
                isValid = Boolean(value);
                break;
            default:
                break;
        }
        setFormState(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                isValid,
                showError: !isValid
            }
        }));
    };

    const handleStatusChange = (value) => {
        setFormState(prev => ({
            ...prev,
            status: { value, isValid: true, showError: false }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formState.title.isValid || !formState.description.isValid || !formState.dueDate.isValid) {
            toast.error("Por favor completa los campos correctamente.");
            return;
        }

        const result = await createTask({
            title: formState.title.value,
            description: formState.description.value,
            dueDate: formState.dueDate.value,
            status: formState.status.value
        });

        if (result) {
            toast.success('¡Tarea creada exitosamente!');
            onSuccess ? onSuccess() : onClose();
        } else {
            toast.error('Error al crear la tarea');
        }
    };

    const isSubmitDisabled =
        loading ||
        !formState.title.isValid ||
        !formState.description.isValid ||
        !formState.dueDate.isValid;

    return (
        <div className={styles.formContainer}>
            <div className={styles.headerForms}>
                <h2>Crea una Tarea</h2>
                <Button onClick={onClose}>X</Button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.formBody}>
                    <label htmlFor="task-title">Título</label>
                    <input
                        type="text"
                        id="task-title"
                        placeholder="Título de la tarea"
                        className={styles.inputField}
                        value={formState.title.value}
                        onChange={(e) => handleInputValueChange(e.target.value, "title")}
                        onBlur={(e) => handleInputValidationOnBlur(e.target.value, "title")}
                    />
                    {formState.title.showError && (
                        <p className={styles.errorMessage}>{validateTitleMessage}</p>
                    )}
                    <label htmlFor="task-description">Descripción</label>
                    <input
                        type="text"
                        id="task-description"
                        placeholder="Descripción de la tarea"
                        className={styles.inputField}
                        value={formState.description.value}
                        onChange={(e) => handleInputValueChange(e.target.value, "description")}
                        onBlur={(e) => handleInputValidationOnBlur(e.target.value, "description")}
                    />
                    {formState.description.showError && (
                        <p className={styles.errorMessage}>{validateDescriptionMessage}</p>
                    )}
                    <label htmlFor="task-dueDate">Fecha Límite</label>
                    <input
                        type="date"
                        id="task-dueDate"
                        className={styles.inputField}
                        value={formState.dueDate.value}
                        onChange={(e) => handleInputValueChange(e.target.value, "dueDate")}
                        onBlur={(e) => handleInputValidationOnBlur(e.target.value, "dueDate")}
                    />
                    {formState.dueDate.showError && (
                        <p className={styles.errorMessage}>La fecha límite es obligatoria.</p>
                    )}
                    <label htmlFor="task-status">Status</label>
                    <TaskStatusComboBox
                        id="status"
                        onChange={handleStatusChange}
                        value={formState.status.value}
                    />
                </div>
                {error && <p className={styles.errorMessage}>{error}</p>}
                <div className={styles.formActions}>
                    <Button type="submit" disabled={isSubmitDisabled}>
                        {loading ? "Creando..." : "Crear Tarea"}
                    </Button>
                    <Button type="button" onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateTaskForm;
