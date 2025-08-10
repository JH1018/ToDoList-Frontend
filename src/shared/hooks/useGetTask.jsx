import { useState, useEffect } from "react";
import { getTasks } from "../../services/api";

const useGetTask = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getTasks();

            if (response.error) {
                setError(response.message || "Ocurrió un error al obtener las tareas");
                setTasks([]);
            } else if (response.data && Array.isArray(response.data.tasks)) {
                setTasks(response.data.tasks);
            } else {
                setTasks([]);
            }
        } catch (err) {
            setError(err.message || "Ocurrió un error al obtener las tareas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return { tasks, loading, error, refetch: fetchTasks };
};

export default useGetTask;
