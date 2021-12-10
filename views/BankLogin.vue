<template>
    <div id="container" class='mt-5 text-center rounded text-light'>
        <div class="flex-row d-flex">
            <div >
                <img src="../components/images/wardabank.jpg" style="width: 300pt;" />
            </div>
            <div>
                <form>
                    <label class="mt-5 h4 formDesc">
                        <strong>E-MAIL/ACCOUNT NUMBER:</strong>
                    </label>
                    <input v-model="logEmail" placeholder="E-Mail / Account Number" class="form-control logInput" />

                    <label class="mt-4 h4 formDesc">
                        <strong>PASSWORD:</strong>
                    </label>
                    <input v-model="logPass" placeholder="Password" type="password" class="form-control logInput" />
                    <h5 class="mt-3 text-primary">{{incorrectLogin}}</h5>
                    
                    <input class="mt-4 btn-info btn text-light logBtn" @click="login()" type="submit" value="Submit" />
                </form>    
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            logEmail: "",
            logPass: "",
            incorrectLogin: ""
        }
    },
    methods: {
        login () {
            let {logEmail, logPass} = this;
            let allInfo = JSON.parse(localStorage.getItem("allInfo"));
            let userInfo = allInfo.find(val => val.email == logEmail || val.actNumber == logEmail);
            if (userInfo) {
                if (userInfo.password !== logPass) {
                    this.incorrectLogin = "Incorrect Password";
                    return;
                } else {
                    localStorage.setItem("loginUser", JSON.stringify(userInfo));
                    this.logEmail = "";
                    this.logPass = "";
                    this.$router.push({name: "home"});
                    return;
                }
            } else {
                this.incorrectLogin = "Email and Password does not exist";
            }
        }
    }
}
</script>

<style>
#container {
    background-color: rgb(47,99,136);
    margin-right: auto;
    margin-left: auto;
    width: 600pt;
    height: 300pt;
}
.logInput {
    font-size: 1.2em;
    margin-left: 20pt;
    width: 250pt;
}
.logBtn {
    font-family: Monospace;
    font-weight: bold;
    font-size: 1.4em;
}
.formDesc {
    font-family: Monospace;
    text-align: center;
}
</style>