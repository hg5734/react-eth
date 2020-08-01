import * as React from "react";
import { Transaction, LogsQuery } from '../../interfaces/interface';
import PubSub from 'pubsub-js'
import { DashboardSevice } from "../../services/dashboard.service";

const styles = {
    list: {
        margin: '10px'
    }
}
class TransactionListComponent extends React.Component<any> {

    state: any = {
        transactions: [],
        token: ''
    }

    componentDidMount() {
        this.updateListSubscriber();
    }

    updateListSubscriber() {
        let token = PubSub.subscribe('TX_LIST', (msg: string, data: LogsQuery) => {
            console.log(data);
            this.transactionList(data)
        });
        this.setState({ token })
    }

    async transactionList(data: LogsQuery) {
        try {
            let response = await DashboardSevice.assetLogsList(data);
            if (response) {
                let { result } = response;
                this.setState({ transactions: result || [] })
            }
        } catch (error) {
            alert(error.response.data.message || 'error in transaction list')
        }
    }
    componentWillUnmount() {
        let { token } = this.state;
        if (token) {
            PubSub.unsubscribe(token);
        }
    }

    render() {
        let { transactions } = this.state;
        return (
            <div>
                <h3>Transaction Logs List</h3>
                <ul>
                    {transactions.map((transaction: Transaction) => (
                        <li key={transaction._id}>
                            <span style={styles.list}> Hash : {transaction.transactionHash}</span>
                            <br />
                            <span style={styles.list}> Eth Address : {transaction.ethAddress}</span>
                            <br />
                            <span style={styles.list}>To Address:  {transaction.toAddress}</span>
                            <br />
                            <span style={styles.list}>From Address {transaction.fromAddress}</span>
                            <br />
                            <span style={styles.list}>Value:  {transaction.value}</span>
                            <br />
                            <span style={styles.list}> Event Type:  {transaction.eventType}</span>
                            <br />
                            <span style={styles.list}>Block No:  {transaction.blockNo}</span>
                            <br />
                            <span style={styles.list}> Asset Address {transaction.assetAddress}</span>
                            <br />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TransactionListComponent;
