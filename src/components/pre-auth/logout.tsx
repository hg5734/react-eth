import * as React from "react";
import Button from '@material-ui/core/Button';
import { AuthSevice } from "../../services/auth.service";
import { withRouter } from "react-router";
const styles = {
    logout: {
        flex: 1,
        justifyContent: 'center',
    }

}
class LogoutComponent extends React.Component<any> {
    constructor(props: any) {
        super(props)
    }

    logout() {
        AuthSevice.clearUser();
        this.props.history.push("/login");
    }

    render() {
        return (
            <div style={styles.logout}>
                <Button variant="contained" color="primary" onClick={() => this.logout()} >
                    Logout
             </Button>
            </div>

        );
    }
}

export default withRouter(LogoutComponent);
