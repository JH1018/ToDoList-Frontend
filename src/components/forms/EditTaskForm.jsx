import React, { useState, useEffect } from 'react';
import Button from '../Button';
import styles from "../../assets/styles/forms.module.css";
import TaskStatusComboBox from '../comboBoxes/TaskStatusComboBox';
import useUpdateTask from '../../shared/hooks/useUpdateTask';
import toast from 'react-hot-toast';
import {
    validateDescription,
    validateDescriptionMessage,
    validateTitle,
    validateTitleMessage
} from "../../shared/validators";

const EditTaskForm = ({ task, onClose, onSuccess }) => {
    const { updateTask, loading, error } = useUpdateTask();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: 'PENDIENTE'
    });
    const [errors, setErrors] = useState({ title: '', description: '' });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                dueDate: task.dueDate || '',
                status: task.status || 'PENDIENTE'
            });
        }
    }, [task]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const field = id.replace('task-', '');

        setFormData(prev => ({ ...prev, [field]: value }));

        if (field === 'title') {
            setErrors(prev => ({
                ...prev,
                title: validateTitle(value) ? '' : validateTitleMessage
            }));
        }
        if (field === 'description') {
            setErrors(prev => ({
                ...prev,
                description: validateDescription(value) ? '' : validateDescriptionMessage
            }));
        }
    };

    const handleStatusChange = (value) => {
        setFormData(prev => ({ ...prev, status: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateTitle(formData.title)) {
            toast.error(validateTitleMessage);
            return;
        }

        if (!validateDescription(formData.description)) {
            toast.error(validateDescriptionMessage);
            return;
        }

        const result = await updateTask(task.uid, formData);

        if (result) {
            toast.success('¡Tarea actualizada exitosamente!');
            onSuccess ? onSuccess() : onClose();
        } else {
            toast.error('Error al actualizar la tarea');
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.headerForms}>
                <h2>Editar Tarea</h2>
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
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.title && <p className={styles.errorMessage}>{errors.title}</p>}
                    <label htmlFor="task-description">Descripción</label>
                    <input
                        type="text"
                        id="task-description"
                        placeholder="Descripción de la tarea"
                        className={styles.inputField}
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.description && <p className={styles.errorMessage}>{errors.description}</p>}
                    <label htmlFor="task-dueDate">Fecha Límite</label>
                    <input
                        type="date"
                        id="task-dueDate"
                        className={styles.inputField}
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="task-status">Status</label>
                    <TaskStatusComboBox
                        id="status"
                        onChange={handleStatusChange}
                        value={formData.status}
                    />
                </div>
                {error && <p className={styles.errorMessage}>{error}</p>}
                <div className={styles.formActions}>
                    <Button type="submit" disabled={loading || errors.title || errors.description}>
                        {loading ? 'Actualizando...' : 'Actualizar Tarea'}
                    </Button>
                    <Button type="button" onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditTaskForm;
