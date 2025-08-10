import { useState, useEffect, useCallback } from "react";
import { getTaskByStatus as getService } from "../../services/api";

const useGetTaskByStatus = (status) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);

    const fetchTasks = useCallback(async () => {
        if (!status) return;
        
        setLoading(true);
        setError(null);

        try {
            const response = await getService(status);

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
    }, [status]);
 
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return { tasks, loading, error, refetch: fetchTasks };
};

export default useGetTaskByStatus;
