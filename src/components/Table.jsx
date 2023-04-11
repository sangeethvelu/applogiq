import React from "react";
import styles from "./Table.module.css";
import Loading from "./UI/Loader/Loading";
import UserListItem from "./UserListItem";
import { useFetchUsersQuery } from "../store/index";

function Table() {

    const {data, isError, isFetching} = useFetchUsersQuery();

    let content;

    if(isFetching) {
        content = <Loading />
    } else if(isError) {
        content = <div>Error Loading Data...</div>
    } else {
        content = data.map((user, index) => {
            return <UserListItem 
                        key={user.id}
                        id={user.id} 
                        index={index + 1}
                        name={user.maidenName} 
                        age={user.age} 
                        bloodGroup={user.bloodGroup}
                        phone={user.phone}
                        email={user.email}
                    />
        })
    }

    return (
        <table className={styles["table"]}>
            <thead className={styles["table-header"]}>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Blood Group</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody className={styles["table-body"]}>
                {content}
            </tbody>
        </table>
    )
}

export default Table;