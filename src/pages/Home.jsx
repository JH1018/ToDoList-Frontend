import React from 'react'
import styles from "../assets/styles/home.module.css"
import Button from '../components/Button';
import ComboBox from '../components/ComboBox';

const Home = () => {

    const test = () => {
        console.log("Button clicked!");
    }

    const handleOnChange = (valor) => {
        console.log("Nuevo valor:", valor);
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.componentsContainer}>
                    <h1 className={styles.title}>TODO LIST</h1>
                    <div className={styles.optionsContainer}>
                        <Button onClick={test}>Click Me</Button>
                        <ComboBox
                            id="status"
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home