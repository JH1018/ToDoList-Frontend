import { useState } from "react";
import { updateTask as updateService } from "../../services/api";

const useUpdateTask = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateTask = async (id, data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await updateService(id, data);

            if (response?.error) {
                setError(response.message || "Ocurrió un error al actualizar la tarea");
                return null;
            }

            return response.data;
        } catch (err) {
            setError(err.message || "Ocurrió un error al actualizar la tarea");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { updateTask, loading, error };
};

export default useUpdateTask;
