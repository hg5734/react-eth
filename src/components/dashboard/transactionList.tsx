import * as React from "react";
import { Transaction } from '../../interfaces/interface';
import PubSub from 'pubsub-js'

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
        this.transactionList();
        this.updateListSubscriber();
    }

    updateListSubscriber() {
        let token = PubSub.subscribe('TX_LIST', () => {
            console.log('transaction list update')
            this.transactionList()
        });
        this.setState({ token })
    }

    async transactionList() {
        try {
            let response = null
            if (response) {
                let { result } = response;
                this.setState({ transactions: result || [] })
            }
        } catch (error) {
            console.log(error);
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
            <ul>
                {transactions.map((transaction: Transaction) => (
                    <li key={transaction.address}>
                        <span style={styles.list}> {transaction.address}</span>
                    </li>
                ))}
            </ul>
        );
    }
}

export default TransactionListComponent;
