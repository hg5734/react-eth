import * as React from "react";
import { Asset } from '../../interfaces/interface';
import PubSub from 'pubsub-js'
import { DashboardSevice } from "../../services/dashboard.service";

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
            }
        } catch (error) {
            alert(error.response.data.message || 'error in asset list')
        }
    }
    componentWillUnmount() {
        let { token } = this.state;
        if (token) {
            PubSub.unsubscribe(token);
        }
    }

    render() {
        let { assets } = this.state;
        return (
            <ul>
                {assets.map((asset: Asset) => (
                    <li key={asset._id}>
                        <span style={styles.list}> {asset.assetAddress}</span>
                        <br/>
                        <span style={styles.list}> {asset.ethAddress}</span>
                        <br/>
                        <span style={styles.list}> {asset.name}</span>
                        <br/>
                        <span style={styles.list}> {asset.symbol}</span>
                        <br/>
                    </li>
                ))}
            </ul>
        );
    }
}

export default AssetListComponent;
