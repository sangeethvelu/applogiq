import React from "react";
import styles from "./Header.module.css";
import Button from "./UI/Button/Button";
import { useAddUserMutation } from "../store/index";

function Header() {

    const [addUser, results] = useAddUserMutation();

    function handleAddAlbum() {
        addUser();
    }

    return (
        <div className={styles["header-container"]}>
            <h1>Applogiq Users</h1>
            <Button onClick={handleAddAlbum} isLoading={results.isLoading}>Add User</Button>
        </div>
    )
}

export default Header;