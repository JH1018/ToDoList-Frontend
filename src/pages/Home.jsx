import React, { useState } from 'react'
import styles from "../assets/styles/home.module.css"
import Button from '../components/Button';
import ComboBox from '../components/ComboBox';
import Task from '../components/Task';
import useGetTask from '../shared/hooks/useGetTask';
import CreateTaskForm from '../components/forms/CreateTaskForm';

const Home = () => {
    const { tasks, loading, error, refetch } = useGetTask();
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleTaskCreated = () => {
        refetch();
        setShowCreateForm(false);
    };

    const handleOpenForm = () => {
        setShowCreateForm(true);
    }

    const handleCloseForm = () => {
        setShowCreateForm(false);
    }

    const handleOnChange = (valor) => {
        console.log("Nuevo valor:", valor);
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
                            onChange={handleOnChange}
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
                    {loading ? (
                        <p>Cargando tareas...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <div className={styles.tasksContainer}>
                            {tasks.map((task) => (
                                <Task
                                    key={task.uid}
                                    title={task.title}
                                    description={task.description}
                                    date={task.dueDate}
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