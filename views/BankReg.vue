<template>
    <div id="regContainer" class="text-center rounded">
        <div class="flex-row d-flex">
            <div>
                <img src="../components/images/moneyPic.jpg" style="width: 620px; height: 600px" class="rounded" />              
            </div>
            <div>
                <form>
                    <label class="mt-3 h5 desc">FIRST NAME: </label>
                    <input v-model="info.firstName" placeholder="First Name" class="form-control infoInput" /> 

                    <label class="mt-3 h5 desc">LAST NAME: </label>
                    <input v-model="info.lastName" placeholder="Last Name" class="form-control infoInput" />
                    
                    <label class="mt-3 h5 desc">E-MAIL:</label>
                    <input v-model="info.email" placeholder="Email" class="form-control infoInput" />
                    <h5 class="text-warning">{{emailExist}}</h5>

                    <label class="mt-3 h5 desc">DATE OF BIRTH:</label>
                    <input v-model="info.dob" type="Date" class="form-control infoInput text-uppercase" />
                    
                    <label class="mt-3 h5 desc">PASSWORD: </label>
                    <input v-model="info.password" type="password" placeholder="Password" maxLength="8" class="form-control infoInput" />

                    <label class="mt-3 h5 desc">CONFIRM PASSWORD:</label>
                    <input v-model="confirmPassword" type="password" placeholder="Confirm Password" maxLength="8" class="form-control infoInput" />
                    <h5 class="text-warning"><strong>{{passNotMatch}}</strong></h5>
                    
                    <input @click="regButton()" class="mt-3 btn bg-danger bg-success text-light regBtn" value="REGISTER" type="submit" />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            info: {firstName: "", lastName: "", email: "", password: "", actNumber: "", balance: 50000, dob: ""},
            confirmPassword: "",
            emailExist: "",
            passNotMatch: ""
        }
    },
    methods: {
        regButton () {
            let {info, confirmPassword} = this;
            let userInfo = JSON.parse(localStorage.getItem("allInfo"));
            if (info.firstName !== "" && info.lastName !== "" && info.email !== "" && info.password !== "" && info.confirmPassword !== "") {
                for (let i = 0; i < 10; i++) {
                    let account = Math.floor(Math.random() * 10);
                    info.actNumber += account;
                }
                if (info.password !== confirmPassword) {
                    this.passNotMatch = "Password Not Match";
                    return;
                }
                if (userInfo) {
                    for (let i = 0; i < userInfo.length; i++) {
                        if (userInfo[i].email == info.email) {
                            this.emailExist = "Email Already Exist";
                            return;
                        }
                    }
                    
                    userInfo = [...userInfo, info];
                    localStorage.setItem("allInfo", JSON.stringify(userInfo));
                    this.info = {firstName: "", lastName: "", email: "", password: "", confirmPassword: "", actNumber: ""};
                    this.$router.push({name: "login"});
                } else {
                    let allInfo = [info];
                    localStorage.setItem("allInfo", JSON.stringify(allInfo));
                    this.info = {firstName: "", lastName: "", email: "", password: "", confirmPassword: "", actNumber: ""};
                    this.$router.push({name: "login"});
                }
            }
        }
    }
}
</script>

<style>
#regContainer {
    background-color: rgb(159,182,188);
    height: 450pt;
    margin: 20pt;
    width: 850pt;
}
.infoInput {
    margin-left: 40pt;
    width: 300pt;
}
.regBtn {
    font-weight: bold;
}
.desc {
    color: rgb(6,77,102);
    font-weight: bold;
    font-size: 1.2em;
}
</style>