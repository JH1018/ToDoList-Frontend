import React from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import styles from "../assets/styles/task.module.css"
import { format, parseISO } from 'date-fns'
import { useDeleteTask } from '../shared/hooks/useDeleteTask'
import useUpdateTaskStatus from '../shared/hooks/useUpdateTaskStatus'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

const Task = ({ uid, title, description, date, status, onTaskDeleted, onTaskEdited, onTaskStatusChanged }) => {
    const { deleteTask, loading } = useDeleteTask();
    const { updateTaskStatus, loading: loadingStatus } = useUpdateTaskStatus();

    const handleCheckboxChange = async (e) => {
        const isChecked = e.target.checked;
        const newStatus = isChecked ? 'COMPLETADA' : 'PENDIENTE';
        
        const result = await updateTaskStatus(uid, { status: newStatus });
        if (result) {
            toast.success(isChecked ? '¡Tarea completada!' : 'Tarea marcada como pendiente');
            if (onTaskStatusChanged) {
                onTaskStatusChanged();
            }
        } else {
            toast.error('Error al actualizar el estado de la tarea');
            e.target.checked = !isChecked;
        }
    };

    const handleEditTask = () => {
        const taskData = { uid, title, description, dueDate: date, status };
        if (onTaskEdited) {
            onTaskEdited(taskData);
        }
    };

    const handleDeleteTask = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Quieres eliminar la tarea "${title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            const deleteResult = await deleteTask(uid);
            if (deleteResult && !deleteResult.error) {
                toast.success('¡Tarea eliminada correctamente!');
                if (onTaskDeleted) {
                    onTaskDeleted();
                }
            } else {
                toast.error('No se pudo eliminar la tarea. Inténtalo de nuevo.');
            }
        }
    };

    const formatDate = (dateString) => {
        try {
            const parsedDate = parseISO(dateString)
            return format(parsedDate, "d 'de' MMMM")
        } catch {
            return dateString
        }
    }

    return (
        <>
            <div className={styles.taskContainer}>
                <div className={styles.checkBox}>
                    <input 
                        type="checkbox" 
                        checked={status === 'COMPLETADA'}
                        onChange={handleCheckboxChange}
                        disabled={loadingStatus}
                    />
                </div>
                <div className={styles.taskDetails}>
                    <div className={status === 'COMPLETADA' ? styles.taskInfoCompleted : styles.taskInfo}>
                        <h2>{title}</h2>
                        <div>
                            <h3>{description}</h3>
                            <h4>{formatDate(date)}</h4>
                        </div>
                    </div>
                    <div className={styles.taskActions}>
                        <div className={styles.taskActions} >
                            <button 
                                className={styles.actionButton} 
                                onClick={handleDeleteTask}
                                disabled={loading}
                            >
                                <FaTrash />
                            </button>
                            <button className={styles.actionButton} onClick={handleEditTask}>
                                <FaEdit />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Task