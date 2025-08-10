import { useState } from "react";
import { createTask as createService } from "../../services/api.jsx";

const useCreateTask = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createTask = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await createService(data);

            if (response?.error) {
                setError(response.message || "Ocurrió un error al crear la tarea"); 
                return null;
            }

            return response.data;

        } catch (err) {
            setError(err.message || "Ocurrió un error al crear la tarea");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { createTask, loading, error };
};

export default useCreateTask;
