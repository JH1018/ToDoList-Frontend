import { useState } from "react";
import { updateTaskStatus as updateStatusService } from "../../services/api";

const useUpdateTaskStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateTaskStatus = async (id, data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await updateStatusService(id, data);

      if (response?.error) {
        setError(response.message || "Ocurrió un error al actualizar el estado de la tarea");
        return null;
      }

      return response.data;
    } catch (err) {
      setError(err.message || "Ocurrió un error al actualizar el estado de la tarea");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateTaskStatus, loading, error };
};

export default useUpdateTaskStatus;