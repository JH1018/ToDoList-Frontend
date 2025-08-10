import { useState } from "react";
import { deleteTask as deleteTaskService } from "../../services/api";

export const useDeleteTask = () =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const deleteTask = async(taskId) =>{
        setLoading(true);
        setError(null);
        setSuccess(false);

        try{
            const response = await deleteTaskService(taskId);
            if (response.error) {
                throw new Error(response.message);
            }
            setSuccess(true);
            return response;
        }catch(err){
            setError(err.message || "Ocurrió un error al eliminar la tarea");
            return {error: true, message: err.message || "Ocurrió un error al eliminar la tarea"};
        }finally {
            setLoading(false);
        }
    };
    return { deleteTask, loading, error, success };
};