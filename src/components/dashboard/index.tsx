import * as React from "react";
import AddUserComponent from "./addAsset";
import UserListComponent from "./transactionList";
import LogoutComponent from "../pre-auth/logout";
import { container } from "../../styles";

const styles = {
    container
}
class UserComponent extends React.Component<any> {

    render() {
        return (
            <div>
                <LogoutComponent />
                <div style={styles.container}>
                    <AddUserComponent />
                    <UserListComponent />
                </div>

            </div>
        );
    }
}

export default UserComponent;
