export const validateDescription = (description) =>{
    const regex = /^(?!\s)(.{3,64})(?<!\s)$/

    return regex.test(description)
}

export const validateDescriptionMessage = "La descripción debe tener entre 3 y 64 caracteres y no puede contener espacios al inicio o al final.";