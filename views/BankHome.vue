<template>
    <div v-if="homeContainer" class="rounded mt-5" id="homeContainer">
        <div class="flex-row d-flex">
            <div class="p-3 rounded homeNav">
                <img src="../components/images/WorldBank.jpg" alt="logo" style="height: 200px; width: 300px;" />
                <HomeNav :profile="profile" :home="home" :transfer="transfer" :notification="notification" :colors="{homeColor, profileColor, transferColor, notificationColor}" />
            </div>
            
            <div v-if="homeShow" class="p-3">
                <h2 class="text-uppercase" style="font-weight: bold;">{{userInfo.firstName + " " + userInfo.lastName}}</h2>
                <p style="margin-top: -15pt; margin-left: 260pt; font-size: .9em">Last login: {{newDate}}</p>

                <div id="welcomeContainer" style="margin: auto'" class="flex-row rounded text-light d-flex">
                    <div class="p-4" style="font-family: Monospace;">
                        <h3>Welcome back, {{userInfo.lastName}}</h3>
                        <p>Check your transactions and manage all your activities here</p>
                    </div>
                    <div>
                        <img src="../components/images/image6.png" alt="building" style="height: 260px; width: 400px; margin-top: -50pt;" />
                    </div>
                </div>

                <div class="flex-row d-flex">
                    <div id="displayProfile" class="mt-3 rounded ">
                        <div class="flex-row p-3 d-flex">
                            <div>
                                <img :src="require(`../components/images/${profileImage}`)" alt="Profile Image" style="height: 120px; width: 120px" />
                            </div>
                            <div class="p-3 text-center">
                                <h3 class="text-light text-uppercase profileInfo">{{userInfo.firstName}}</h3>
                                <h3 class="text-light text-uppercase profileInfo">{{userInfo.lastName}}</h3>
                            </div>
                        </div>
                        <div class="flex-row p-3 d-flex" style="margin-top: -25pt">
                            <div>
                                <h4 style="font-weight: bold; color: rgb(90,7,150);" class="mt-3">E-MAIL:</h4>
                                <h4 style="font-weight: bold; color: rgb(90,7,150)" class="mt-3">DOB:</h4>
                                
                            </div>
                            <div style="margin-left: 40pt;">
                                <h4 class="mt-3 text-light">{{userInfo.email}}</h4>
                                <h4 class="mt-3 text-light">{{userInfo.dob}}</h4>
                            </div>
                        </div>   
                    </div>
                    
                    <div class="p-3">
                        <div class="flex-row d-flex">
                            <div class="text-center rounded actInfoContainer">
                                <h6 class="mt-2">ACCOUNT</h6>
                                <h4>NUMBER</h4>
                                <h2 class="text-light">{{userInfo.actNumber}}</h2>
                            </div>
                            <div class="text-center rounded actInfoContainer" style="margin-left: 10pt;">
                                <h6 class="mt-2">ACCOUNT</h6>
                                <h4>BALANCE</h4>
                                <h2 class="text-light"><span style="text-decoration: double line-through">N</span>{{userInfo.balance}}</h2>
                            </div>
                        </div>

                        <div class="mt-3 rounded transactionContainer">
                            <h4 class="p-2">Last Transaction</h4>
                            <div class="text-center rounded bg-light" style="height: 55pt; width: 285pt; margin-top: 0pt; margin-left: 10pt;">
                                <strong>{{message}}</strong>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
            <Profile v-if="profileShow" :userInfo="userInfo" :profileImage="profileImage" @uploadImage="newProfilePic" />
            <Transfer v-if="transferShow" :userInfo="userInfo" />
            <Notification v-if="notificationShow" :userInfo="userInfo" :transactions="transactions" />
        </div>
    </div>
</template>

<script>
import HomeNav from '../components/HomeNavBar';
import Profile from '../components/BankProfile';
import Transfer from '../components/BankTransfer';
import Notification from '../components/BankNotification';
export default {
    data () {
        return {
            userInfo: {},
            newDate: Date(),
            profileImage: "image3.png",
            message: "",
            transactions: [],
            homeShow: true,
            profileShow: false,
            transferShow: false,
            notificationShow: false,
            homeContainer: true,
            homeColor: {backgroundColor: "rgb(57,57,125)"},
            profileColor: {backgroundColor: ""},
            transferColor: {backgroundColor: ""},
            notificationColor: {backgroundColor: ""}
        }
    },
    methods: {
      home () {
          this.homeShow = true;
          this.homeColor = {backgroundColor: "rgb(57,57,125)"};
          this.profileShow = false;
          this.transferShow = false;
          this.notificationShow = false;
          this.profileColor = {backgroundColor: ""};
          this.transferColor = {backgroundColor: ""};
          this.notificationColor = {backgroundColor: ""};
      },
      profile () {
          this.profileShow = true;
          this.profileColor = {backgroundColor: "rgb(57,57,125)"};
          this.homeShow = false;
          this.transferShow = false;
          this.notificationShow = false;
          this.homeColor = {backgroundColor: ""};
          this.transferColor = {backgroundColor: ""};
          this.notificationColor = {backgroundColor: ""};
      },
      transfer () {
          this.transferShow = true;
          this.transferColor = {backgroundColor: "rgb(57,57,125)"};
          this.homeShow = false;
          this.profileShow = false;
          this.notificationShow = false;
          this.homeColor = {backgroundColor: ""};
          this.profileColor = {backgroundColor: ""};
          this.notificationColor = {backgroundColor: ""};
      },
      notification () {
          this.notificationShow = true;
          this.notificationColor = {backgroundColor: "rgb(57,57,125)"};
          this.homeShow = false;
          this.profileShow = false;
          this.transferShow = false;
          this.homeColor = {backgroundColor: ""};
          this.profileColor = {backgroundColor: ""};
          this.transferColor = {backgroundColor: ""};
      },
      newProfilePic (newImage) {
          this.profileImage = newImage;
      },
    },
    mounted () {
        let info = JSON.parse(localStorage.getItem("loginUser"));
       let transferInfo = JSON.parse(localStorage.getItem("transferInfo"));
        if (!info) {
            this.$router.push({name: 'login'})
        }
        this.userInfo = info;
        if (transferInfo) {
            let {userInfo} = this;
            let user = `${userInfo.firstName} ${userInfo.lastName}`;
            for (let i = 0; i < transferInfo.length; i++) {
                if (transferInfo[i].sender == user) {
                    this.message = `Dear ${user}, you transferred ${transferInfo[i].amount} to ${transferInfo[i].receiver}`;
                    this.transactions.push(transferInfo[i]);
                } else if (transferInfo[i].receiver == user) {
                    this.message = `Dear ${user}, you have received ${transferInfo[i].amount} from ${transferInfo[i].sender}`;
                    this.transactions.push(transferInfo[i]);
                } else {
                    this.message = `Dear ${user}, your account has been credited with 50,000 by default for opening an account with us. Thanks.`
                }
            }
            if (this.transactions.length > 5) {
                this.transactions = this.transactions.slice(1)
            }
        }
    },
    components: {
        HomeNav,
        Profile,
        Transfer,
        Notification
    }
}
</script>

<style>
#homeContainer {
    background-color: rgb(101,150,229);
    height: 400pt;
    margin: auto;
    width: 900pt;
}
.homeNav {
    background-image: url("../components/images/piggybank1.jpg");
    height: 400pt;
    width: 250pt;
}
#welcomeContainer {
    background-color: rgb(57,57,125);
    height: 100pt;
    width: 625pt;
}
#displayProfile {
    background-color: rgb(63,123,195);
    height: 220pt;
    width: 300pt;
}
.profileInfo {
    font-weight: bold;
}
.actInfoContainer {
    background-color: rgb(63,123,195);
    font-family: serif;
    font-weight: bolder;
    height: 100pt;
    width: 150pt;
}
.transactionContainer {
    background-color: rgb(63,123,195);
    height: 105pt;
    width: 310pt;
}
</style>