import * as React from "react";
import Button from '@material-ui/core/Button';
import { email, required } from "../../utils/validations";
import { renderField } from "../common/form/field";
import { Field, reduxForm } from 'redux-form'
import { Asset } from '../../interfaces/interface';
import PubSub from 'pubsub-js'


class AddAssetComponent extends React.Component<any> {

    constructor(props: any) {
        super(props)
    }

    addAsset = async (values: Asset) => {
        console.log('control in add asset')
        try {
            let response = null;
            if (response) {
                this.props.reset();
                PubSub.publish('TX_LIST', '');
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message || 'error in add asset')
        }
    }
    
    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div >
                <form onSubmit={handleSubmit(this.addAsset).bind(this)}>
                    <Field name="address" type="text" component={renderField} label="Address" validate={[required]} />
                    <div> <Button variant="contained" color="primary" type="submit" disabled={submitting}> Add Asset</Button></div>
                </form>
            </div>
        );
    }
}

export default reduxForm({ form: 'assetForm' })(AddAssetComponent);

