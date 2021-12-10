<template>
    <div class="flex-row p-4 mt-4 rounded d-flex" id="transferPage">
        <div>
            <img src="../components/images/moneytransfer.jpg" alt="Money Transfer" style="height: 400px; width: 400px;" />
        </div>
        
        <div class="p-3" style="margin-top: -15pt;">
            <label class="detailLabel">RECEIVER ACCOUNT NUMBER: </label>
            <input v-model="recActNum" placeholder="Receiver Account Number" class="mt-2 form-control transferInput" @input="recDetails()" />

            <label class="mt-3 detailLabel">RECEIVER ACCOUNT NAME:</label>
            <input class="text-uppercase form-control transferInput" :value="receiverDetails" disabled/>
                
            <label class="mt-3 detailLabel">AMOUNT TO TRANSFER: </label>
            <input v-model="transferPrice" placeholder="Transfer Price" class="mt-2 form-control transferInput" />

            <label v-if="transferConfirm" class="detailLabel">Enter your Password to confirm transfer</label>
            <input v-if="transferConfirm" v-model="confirmPassword" class="mt-2 form-control transferInput" type="password" />
                
            <button @click="transfer()" class="mt-3 btn bg-danger text-light transferBtn">TRANSFER</button>
            <h5 class="detailLabel">{{message}}</h5>
        </div>
        
    </div>
</template>

<script>
export default {
    props: ['userInfo'],
    data () {
        return {
            recActNum: "",
            transferPrice: "",
            confirmPassword: "",
            transferConfirm: false,
            receiverDetails: "",
            message: ""
        }
    },
    methods: {
        transfer () {
            let allTransfer = [];
           let transfer = JSON.parse(localStorage.getItem("transferInfo"));
            let {recActNum, transferPrice, transferConfirm, confirmPassword, userInfo} = this;
            let allInfo = JSON.parse(localStorage.getItem("allInfo"));
            let recInfo = allInfo.find(val => val.actNumber == recActNum);
            let senderInfo = allInfo.find(val => val.actNumber == userInfo.actNumber)
            if (recActNum !== "" && transferPrice !== "") {
                if (recActNum == userInfo.actNumber) {
                    this.message = "Dear Customer, you can't transfer to yourself";
                    return;
                }
                if (!transferConfirm) {
                    this.transferConfirm = true;
                    return;
                } else {
                    this.transferConfirm = false;
                }
                if (confirmPassword !== userInfo.password) {
                    alert("Incorrect Password");
                    return;
                }
                if (transferPrice > userInfo.balance) {
                    this.message = `Insufficient balance. Your balance is: ${userInfo.balance}`;
                    return;
                }
                if (recInfo) {
                    recInfo.balance = +recInfo.balance + +transferPrice;
                    localStorage.setItem("allInfo", JSON.stringify(allInfo));
                    this.message = `You have successfully transfer ${transferPrice} to ${recInfo.firstName} ${recInfo.lastName}`;
                }
                if (senderInfo) {
                    senderInfo.balance = +senderInfo.balance - +transferPrice;
                    localStorage.setItem("allInfo", JSON.stringify(allInfo));
                }
// setting up transfer info for transfer message
                let transferInfo = {
                    receiver: `${recInfo.firstName} ${recInfo.lastName}`, sender: `${userInfo.firstName} ${userInfo.lastName}`, amount: transferPrice
                            };
                if (transfer) {
                    transfer = [...transfer, transferInfo];
                    localStorage.setItem("transferInfo", JSON.stringify(transfer));
                } else {
                    allTransfer = [transferInfo];
                    localStorage.setItem("transferInfo", JSON.stringify(allTransfer));
                }
            }
        },
// receiver Details
        recDetails () {
            let {recActNum} = this;
            let allInfo = JSON.parse(localStorage.getItem("allInfo"));
            for (let i = 0; i < allInfo.length; i++) {
                if (allInfo[i].actNumber == recActNum) {
                    this.receiverDetails = allInfo[i].firstName + " " + allInfo[i].lastName;
                    return;
                } else {
                    this.receiverDetails = "";
                }
            }
        }
    }
}
</script>

<style>
#transferPage {
    background-color: rgb(63,123,195);
    margin-left: auto;
    margin-right: auto;
    height: 350pt;
    
    width: 600pt;
}
.transferInput {
    font-family: monospace;
    font-weight: bold;
    
    width: 250pt;
}
.detailLabel {
    font-family: monospace;
    font-weight: bold;
    font-size: 1.3em;
    color: #fff;
}
.transferBtn {
    font-family: monospace;
    font-weight: bold;
    font-size: 1.3em;
}
</style>