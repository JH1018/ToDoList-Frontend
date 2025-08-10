import React from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import styles from "../assets/styles/task.module.css"
import { format, parseISO } from 'date-fns'

const Task = ({ title, description, date }) => {
    const formatDate = (dateString) => {
        try {
            const parsedDate = parseISO(dateString)
            return format(parsedDate, "d 'de' MMMM")
        } catch {
            return dateString
        }
    }

    return (
        <>
            <div className={styles.taskContainer}>
                <div className={styles.checkBox}>
                    <input type="checkbox" />
                </div>
                <div className={styles.taskDetails}>
                    <div className={styles.taskInfo}>
                        <h2>{title}</h2>
                        <div>
                            <h3>{description}</h3>
                            <h4>{formatDate(date)}</h4>
                        </div>
                    </div>
                    <div className={styles.taskActions}>
                        <div className={styles.taskActions} >
                            <button className={styles.actionButton}><FaTrash /></button>
                            <button className={styles.actionButton}><FaEdit /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Task