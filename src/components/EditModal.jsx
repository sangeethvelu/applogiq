import React from 'react';
import ReactDOM from 'react-dom';
import styles from './EditModal.module.css';
import Button from './UI/Button/Button';
import { useUpdateUserMutation } from '../store/index';

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.modal} />;
};

const ModalOverlay = (props) => {

    const [updateUser, results] = useUpdateUserMutation();

    const [formData, setFormData] = React.useState({
        name: props.name,
        age: props.age,
        bloodGroup: props.bloodGroup,
        phone: props.phone,
        email: props.email
    })

    function handleFormChange(event) {
        const {name, value} = event.target;
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        updateUser({...formData, id: props.id})
    }

  return (
    <div className={styles.modal}>
      <header className={styles.header}>
        <h2>Edit User Data</h2>
      </header>
      <form className={styles.content}>
        <label className={styles["label"]}>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleFormChange} required/>
        <label className={styles["label"]}>Age</label>
        <input type="number" name="age" value={formData.age} onChange={handleFormChange} required min="1"/>
        <label className={styles["label"]}>Blood Group</label>
        <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleFormChange} required/>
        <label className={styles["label"]}>Phone Number</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleFormChange} required/>
        <label className={styles["label"]}>Email</label>
        <input type="text" name="email" value={formData.email} onChange={handleFormChange} required/>
        <div className={styles.actions}>
            <Button classname="btn-cancel" type="button" onClick={props.modal}>Cancel</Button>
            <Button onClick={handleFormSubmit}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

function EditModal (props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop modal={props.modal} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay name={props.name} id={props.id} age={props.age} bloodGroup={props.bloodGroup} phone={props.phone} email={props.email} modal={props.modal} />,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  );
};

export default EditModal;
















// import ReactDOM from "react-dom";
// import styles from "./EditModal.module.css";

// function EditModal() {
//     return ReactDOM.createPortal(<div className={styles["modal-overlay"]}>
//     <div className={styles["modal"]}>
//         <div className={styles["modal-header"]}>
//             <h2>Modal Title</h2>
//             <button className={styles["close-button"]}>X</button>
//         </div>
//         <div className={styles["modal-content"]}>
//             <p>Modal content here</p>
//         </div>
//     </div>
// </div>, document.getElementById("modal"));
// }

// export default EditModal;   