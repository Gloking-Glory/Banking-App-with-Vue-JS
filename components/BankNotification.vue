<template>
    <div class="p-3">
        <h3>Transfer History</h3>
        <div>
            <div class="p-2 mt-3 rounded" id="transferMessage" v-for="(debit, index) in debitTransfer" :key="index">
                <p v-if="debitTransfer.length !== 0" class="myMessage">Dear Customer, you transferred {{debit.amount}} to {{debit.receiver}}</p>
            </div>
            <div  class="p-2 mt-3 rounded" id="transferMessage" v-for="(credit, index) in creditTransfer" :key="index">
                <p v-if="creditTransfer.length !== 0" class="myMessage">Dear Customer, you received {{credit.amount}} from {{credit.sender}}</p>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    props: ['userInfo', 'transactions'],
    data () {
        return {
            debitTransfer: [],
            creditTransfer: [],
        }
    },
    mounted () {
        let {transactions, userInfo} = this;
        let user = `${userInfo.firstName} ${userInfo.lastName}`;
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].sender == user) {
                this.debitTransfer.push(transactions[i]);
            } else if (transactions[i].receiver == user) {
                this.creditTransfer.push(transactions[i]);
            }
        }
    }
}
</script>

<style>
#transferMessage {
    background-color: #fff;
    height: 60pt;
    width: 400pt;
}
.myMessage {
    font-family: monospace;
    font-size: 1.2em;
    font-weight: bold;
}
</style>