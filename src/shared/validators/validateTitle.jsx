export const validateTitle = (title) =>{
    const regex = /^\S{3,64}$/

    return regex.test(title)
}

export const validateTitleMessage = "El título debe tener entre 3 y 64 caracteres y no puede contener espacios al inicio o al final.";