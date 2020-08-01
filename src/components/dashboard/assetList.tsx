import * as React from "react";
import { Asset } from '../../interfaces/interface';
import PubSub from 'pubsub-js'
import { DashboardSevice } from "../../services/dashboard.service";
import { ErrorMessage } from "../../utils/message";

const styles = {
    list: {
        margin: '10px'
    }
}
class AssetListComponent extends React.Component<any> {

    state: any = {
        assets: [],
        token: ''
    }

    componentDidMount() {
        this.assetList();
        this.updateListSubscriber();
    }

    updateListSubscriber() {
        let token = PubSub.subscribe('ASSET_LIST', () => {
            this.assetList()
        });
        this.setState({ token })
    }

    async assetList() {
        try {
            let response = await DashboardSevice.assetList();
            if (response) {
                let { result } = response;
                this.setState({ assets: result || [] })
                if (result && result[0]) {
                    this.showTransactionLogs(result[0]);
                }
            }
        } catch (error) {
            alert((error.response && error.response.data && error.response.data.message)|| error.message || ErrorMessage.SOMETHING_WENT_WRONG)
        }
    }
    componentWillUnmount() {
        let { token } = this.state;
        if (token) {
            PubSub.unsubscribe(token);
        }
    }

    showTransactionLogs(asset: Asset) {
        PubSub.publish('TX_LIST', {
            assetAddress: asset.assetAddress,
            ethAddress: asset.ethAddress
        });
    }

    render() {
        let { assets } = this.state;
        return (
            <div>
                <h3>Asset List</h3>
                <ul>
                    {assets.map((asset: Asset) => (
                        <li key={asset._id} onClick={() => this.showTransactionLogs(asset)}>
                            <span style={styles.list}>Asset Address :  {asset.assetAddress}</span>
                            <br />
                            <span style={styles.list}>Eth Address:   {asset.ethAddress}</span>
                            <br />
                            <span style={styles.list}>Asset Name:  {asset.name}</span>
                            <br />
                            <span style={styles.list}> Asset Symbol:  {asset.symbol}</span>
                            <br />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default AssetListComponent;
