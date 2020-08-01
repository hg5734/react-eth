import * as React from "react";
import AddUserComponent from "./addAsset";
import AssetListComponent from "./assetList";
import LogoutComponent from "../pre-auth/logout";
import { container } from "../../styles";
import TransactionListComponent from "./transactionList";

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
                    <AssetListComponent />
                    <TransactionListComponent/>
                </div>

            </div>
        );
    }
}

export default UserComponent;
