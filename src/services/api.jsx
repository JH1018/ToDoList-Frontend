import axios from "axios";

const apiTodo = axios.create({
    baseURL: "http://127.0.0.1:3005/toDoList/v1",
    timeout: 5000,
});

export const createTask = async (data) => {
    try {
        return await apiTodo.post("/task/createTask", data);
    } catch (err) {
        return {
            error: true,
            message: err.message,
        }
    }
}

export const getTasks = async () => {
    try {
        return await apiTodo.get("/task/")
    } catch (err) {
        return {
            error: true,
            message: err.message
        }
    }
}

export const getTaskByStatus = async (data) => {
    try {
        return await apiTodo.get("/task/getTasksByStatus", data)
    } catch (err) {
        return {
            error: true,
            message: err.message
        }
    }
}

export const updateTask = async (id, data) => {
    try {
        return await apiTodo.patch(`/task/updateTask/${id}`, data)
    } catch (err) {
        return {
            error: true,
            message: err.message
        }
    }
}

export const updateTaskStatus = async (id, data) => {
    try {
        return await apiTodo.patch(`/task/updateTaskStatus/${id}`, data)
    } catch (err) {
        return {
            error: true,
            message: err.message
        }
    }
}

export const deleteTask = async(id) =>{
    try{
        return await apiTodo.patch(`/task/deleteTask/${id}`)
    }catch(err){
        return {
            error: true,
            message: err.message
        }
    }
}