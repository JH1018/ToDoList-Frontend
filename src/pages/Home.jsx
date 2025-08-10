import React, { useState } from 'react'
import styles from "../assets/styles/home.module.css"
import Button from '../components/Button';
import ComboBox from '../components/comboBoxes/ComboBox';
import Task from '../components/Task';
import useGetTask from '../shared/hooks/useGetTask';
import useGetTaskByStatus from '../shared/hooks/useGetTaskByStatus';
import CreateTaskForm from '../components/forms/CreateTaskForm';
import EditTaskForm from '../components/forms/EditTaskForm';

const Home = () => {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    
    const { tasks: allTasks, loading: loadingAll, error: errorAll, refetch: refetchAll } = useGetTask();
    
    const { tasks: filteredTasks, loading: loadingFiltered, error: errorFiltered, refetch: refetchFiltered } = useGetTaskByStatus(selectedStatus);
    
    const tasks = selectedStatus ? filteredTasks : allTasks;
    const loading = selectedStatus ? loadingFiltered : loadingAll;
    const error = selectedStatus ? errorFiltered : errorAll;

    const refreshTasks = () => {
        refetchAll();
        if (selectedStatus && refetchFiltered) {
            refetchFiltered();
        }
    };

    const handleTaskCreated = () => {
        refreshTasks();
        setShowCreateForm(false);
    };

    const handleTaskEdited = (task) => {
        setTaskToEdit(task);
        setShowEditForm(true);
    };

    const handleTaskUpdated = () => {
        refreshTasks();
        setShowEditForm(false);
        setTaskToEdit(null);
    };

    const handleOpenForm = () => {
        setShowCreateForm(true);
    }

    const handleCloseForm = () => {
        setShowCreateForm(false);
    }

    const handleCloseEditForm = () => {
        setShowEditForm(false);
        setTaskToEdit(null);
    }

    const handleStatusChange = (status) => {
        setSelectedStatus(status === 'TODAS' ? '' : status);
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.componentsContainer}>
                    <h1 className={styles.title}>TODO LIST</h1>
                    <div className={styles.optionsContainer}>
                        <Button onClick={handleOpenForm}>Crear Tarea</Button>
                        <ComboBox
                            id="status"
                            onChange={handleStatusChange}
                        />
                    </div>
                    {showCreateForm && (
                        <div className={styles.modalOverlay}>
                            <div className={styles.modalContent}>
                                <CreateTaskForm 
                                    onClose={handleCloseForm}
                                    onSuccess={handleTaskCreated}
                                />
                            </div>
                        </div>
                    )}
                    {showEditForm && taskToEdit && (
                        <div className={styles.modalOverlay}>
                            <div className={styles.modalContent}>
                                <EditTaskForm 
                                    task={taskToEdit}
                                    onClose={handleCloseEditForm}
                                    onSuccess={handleTaskUpdated}
                                />
                            </div>
                        </div>
                    )}
                    {loading ? (
                        <p>Cargando tareas...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <div className={styles.tasksContainer}>
                            {tasks.map((task) => (
                                <Task
                                    key={task.uid}
                                    uid={task.uid}
                                    title={task.title}
                                    description={task.description}
                                    date={task.dueDate}
                                    status={task.status}
                                    onTaskDeleted={refreshTasks}
                                    onTaskEdited={handleTaskEdited}
                                    onTaskStatusChanged={refreshTasks}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home