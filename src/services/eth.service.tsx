import BaseSevice from "./base";
import Web3 from 'web3';
import TokenABI from '../abis/token.abi';
import { constant } from "../utils/constant";
const { utils } = Web3;
const { etherNet, etherNetSocket } = constant;


export class EthSevice extends BaseSevice {

    static web3Obj = new Web3(new Web3.providers.HttpProvider(etherNet));
    static   = new Web3.providers.WebsocketProvider(etherNetSocket);

    static formatBalance(balance: string) {
        return balance; // TODO: format the balance according to requirement
    }

    static getContract(abi: any, address: string) {
        return new this.web3Obj.eth.Contract(abi, address);
    }

    static async getBalanceOfAsset(ethAddress: string, contractAddress: string) {
        const contract = this.getContract(TokenABI, contractAddress);
        const balance = await contract.methods.balanceOf(ethAddress).call();
        console.log('balance', balance)
        return this.formatBalance(balance);
    }

    static isValidAddress(rawInput: string) {
        try {
            return Web3.utils.toChecksumAddress(rawInput)
        } catch (err) {
            return false;
        }
    }

    static async getAssetLogs(ethAddress: string, contractAddress: string) {
        const latestBlock = await this.web3Obj.eth.getBlockNumber();
        console.log(latestBlock)
        try {
            const result = await this.web3Obj.eth.getPastLogs({
                toBlock: utils.toHex(latestBlock),
                fromBlock: utils.toHex(0),
                address: [utils.toHex(ethAddress)],
            });
            console.log(result);

        } catch (error) {
            console.log(error);
        }

    }




}