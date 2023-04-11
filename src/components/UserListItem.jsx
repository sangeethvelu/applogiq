import { useState } from "react";
import styles from "./UserListItem.module.css";
import { RiDeleteBin2Fill, RiEditFill } from "react-icons/ri";
import Button from "./UI/Button/Button";
import EditModal from "./EditModal";
import { useDeleteUserMutation } from "../store/index";

function UserListItem(props) {

    const [deleteUser, results] = useDeleteUserMutation();
    const [showModal, setShowModal] = useState(false);

    function handleModal() {
        setShowModal(prevState => !prevState);
    }

    function handleDeleteUser(id) {
        deleteUser(id);
    }

    return (
        <tr>
            <td>{props.index}</td>
            <td>{props.name}</td>
            <td>{props.age}</td>
            <td>{props.bloodGroup}</td>
            <td>{props.phone}</td>
            <td>{props.email}</td>
            <td className={styles["data-edit-column"]}>
                <Button onClick={handleModal}><RiEditFill/></Button>
                <Button onClick={() => handleDeleteUser(props.id)} isLoading={results.isLoading}><RiDeleteBin2Fill/></Button>
            </td>
            {showModal && 
                <EditModal 
                    name={props.name} id={props.id} age={props.age} bloodGroup={props.bloodGroup} phone={props.phone} email={props.email} modal={handleModal}
                />
            }
        </tr>
    )
}

export default UserListItem;