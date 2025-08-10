import React, { useState, useEffect } from 'react'
import Button from '../Button'
import styles from "../../assets/styles/forms.module.css"
import TaskStatusComboBox from '../comboBoxes/TaskStatusComboBox'
import useUpdateTask from '../../shared/hooks/useUpdateTask'
import toast from 'react-hot-toast'

const EditTaskForm = ({ task, onClose, onSuccess }) => {
    const { updateTask, loading, error } = useUpdateTask();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: 'PENDIENTE'
    });

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
        setFormData(prev => ({
            ...prev,
            [id.replace('task-', '')]: value
        }));
    };

    const handleStatusChange = (value) => {
        setFormData(prev => ({
            ...prev,
            status: value
        }));
    };

    return (
        <>
            <div className={styles.formContainer}>
                <div className={styles.headerForms}>
                    <h2>Editar Tarea</h2>
                    <Button onClick={onClose}>X</Button>
                </div>
                <div>
                    <form onSubmit={async (e) => {
                            e.preventDefault();
                            const result = await updateTask(task.uid, formData);
                            if (result) {
                                toast.success('¡Tarea actualizada exitosamente!');
                                if (onSuccess) {
                                    onSuccess();
                                } else {
                                    onClose();
                                }
                            } else {
                                toast.error('Error al actualizar la tarea');
                            }
                        }}>
                        <div className={styles.formBody}>
                            <label htmlFor="task-title">Título</label>
                            <input
                                type="text"
                                id="task-title"
                                placeholder='Título de la tarea'
                                className={styles.inputField}
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="task-description">Descripción</label>
                            <input
                                type="text"
                                id="task-description"
                                placeholder='Descripción de la tarea'
                                className={styles.inputField}
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
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
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Actualizando...' : 'Actualizar Tarea'}
                            </Button>
                            <Button type="button" onClick={onClose} disabled={loading}>
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default EditTaskForm
