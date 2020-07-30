import * as React from "react";
import Button from '@material-ui/core/Button';
import { required } from "../../utils/validations";
import { renderField } from "../common/form/field";
import { Field, reduxForm } from 'redux-form'
import { Asset } from '../../interfaces/interface';
import PubSub from 'pubsub-js'
import { EthSevice } from "../../services/eth.service";
import { connect } from 'react-redux'


class AddAssetComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        // Added temp address for autofill

    }

    addAsset = async (values: Asset) => {
        console.log('control in add asset', values)
        try {
            // this.props.reset();
            values = {
                address: '0x0E0744b920960c4B74Db4980C9f84784d0956c77',
                assetAddress: '0xd08b29350b50748b0c2fc052a2cb93fa1e68f973'
            };
            let balance = await EthSevice.getBalanceOfAsset(values.address, values.assetAddress)
            console.log(balance, 'balance')
            let logs  = await EthSevice.getAssetLogs(values.address, values.assetAddress);
            console.log(logs,'logs');
            PubSub.publish('TX_LIST', '');
        } catch (error) {
            console.log(error);
            alert(error.message || 'error in add asset')
        }
    }

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <div >
                <form onSubmit={handleSubmit(this.addAsset).bind(this)}>
                    <Field name="address" type="text" component={renderField}  label="Address" validate={[required]} />
                    <Field name="assetAddress" type="text" component={renderField} label="Asset Address" validate={[required]} />
                    <div> <Button variant="contained" color="primary" type="submit" disabled={submitting}> Add Asset</Button></div>
                </form>
            </div>
        );
    }
}

export default reduxForm({ form: 'assetForm', enableReinitialize: true })(AddAssetComponent);

