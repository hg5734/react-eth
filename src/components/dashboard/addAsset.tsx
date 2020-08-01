import * as React from "react";
import Button from '@material-ui/core/Button';
import { required } from "../../utils/validations";
import { renderField } from "../common/form/field";
import { Field, reduxForm } from 'redux-form'
import { Asset } from '../../interfaces/interface';
import PubSub from 'pubsub-js'
import { EthSevice } from "../../services/eth.service";
import { DashboardSevice } from "../../services/dashboard.service";
import { ErrorMessage } from "../../utils/message";

class AddAssetComponent extends React.Component<any, any> {

    addAsset = async (values: Asset) => {
        console.log('control in add asset', values)
        try {
            if (!EthSevice.isValidAddress(values.ethAddress) || !EthSevice.isValidAddress(values.assetAddress)) {
                alert(ErrorMessage.INVALID_ADDRESS)
                return;
            }
            let response = await DashboardSevice.addAsset(values);
            if (response) {
                this.props.reset();
                PubSub.publish('ASSET_LIST', '');
                // let balance = await EthSevice.getBalanceOfAsset(values.ethAddress, values.assetAddress)
                // console.log(balance, 'balance')
                this.props.reset();
            }
        } catch (error) {
            console.log(error);
            alert((error.response && error.response.data && error.response.data.message)|| error.message || ErrorMessage.SOMETHING_WENT_WRONG)
        }
    }

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div >
                <form onSubmit={handleSubmit(this.addAsset).bind(this)}>
                    <Field name="ethAddress" type="text" component={renderField} label="Address" validate={[required]} />
                    <Field name="assetAddress" type="text" component={renderField} label="Asset Address" validate={[required]} />
                    <Field name="name" type="text" component={renderField} label="Asset Name" validate={[required]} />
                    <Field name="symbol" type="text" component={renderField} label="Symbol" />
                    <div> <Button variant="contained" color="primary" type="submit" disabled={submitting}> Add Asset</Button></div>
                </form>
            </div>
        );
    }
}

export default reduxForm({ form: 'assetForm', enableReinitialize: true })(AddAssetComponent);

