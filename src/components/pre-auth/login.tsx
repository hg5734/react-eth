import * as React from "react";
import Button from '@material-ui/core/Button';
import { AuthSevice } from "../../services/auth.service";
import { Field, reduxForm } from 'redux-form'
import { email, required } from "../../utils/validations";
import { renderField } from "../common/form/field";
import { LoginInterface } from '../../interfaces/interface';
import { container, button } from "../../styles";

const styles = {
    loginContainer: {
        ...container
    },
    button: {
        ...button,
    }
}

class LoginComponent extends React.Component<any> {
    constructor(props: any) {
        super(props)
        this.authGuard(AuthSevice.getUserData());
    }

    authGuard(result: any) {
        if (result) {
            this.props.history.push("/app/dashboard");
        }
    }

    login = async (values: LoginInterface) => {
        console.log('control in login', values)
        try {
            let response: any = await AuthSevice.login(values)
            if (response) {
                let { result } = response;
                AuthSevice.setUserData(result);
                this.authGuard(result);
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message || 'error in login')
        }
    }

    render() {
        const { submitting, handleSubmit } = this.props
        return (
            <div style={styles.loginContainer}>
                <form onSubmit={handleSubmit(this.login).bind(this)} >
                    <Field name="email" type="email" component={renderField} label="Email Id" validate={[email, required]} />
                    <Field name="password" type="password" component={renderField} label="Password" validate={[required]} />
                    <Button style={styles.button} variant="contained" color="primary" type="submit" disabled={submitting}> Login</Button>
                </form>
            </div>
        );
    }
}

export default reduxForm({ form: 'loginForm' })(LoginComponent);
