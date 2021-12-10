<template>
    <div class="flex-row d-flex">
        <div class="p-3" style="font-family: monospace;">
            <img :src="require(`../components/images/${profileImage}`)" style="width: 200px; height: 200px; margin-left: auto; margin-right: auto; display: block;" class="center rounded-circle" alt="Profile Image" />

            <h3 class="text-center">{{userInfo.firstName + " " + userInfo.lastName}}</h3>
            <h5 class="text-center">Account Number: {{userInfo.actNumber}}</h5>

            <p class="mt-2 text-center">Upload New Picture</p>
            <input type="file" class="form-control" @change="selectNew"/>
            
            <button @click="uploadImage()" class="mt-4 text-center btn bg-success text-light" style="margin-right: auto; margin-left: auto; display: block;">UPLOAD IMAGE</button>
        </div>
        
        <div class="p-3" id="profileContainer">
            <div v-if="!editShow">
                <table class="table">
                    <tbody>
                        <tr>
                            <td>First Name</td>
                            <td class="text-light">{{userInfo.firstName}}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td class="text-light">{{userInfo.lastName}}</td>
                        </tr>
                        <tr>
                            <td>E-Mail</td>
                            <td class="text-light">{{userInfo.email}} </td>
                        </tr>
                        <tr>
                            <td>Date of Birth</td>
                            <td class="text-light">{{userInfo.dob}}</td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn bg-success text-light" style="font-weight: bold; font-size: .8em;" @click="editInfo()">EDIT INFO</button>
            </div>
            
            <div v-else>
                <form class="text-center">
                    <label>First Name:</label>
                    <input v-model="newInfo.firstName" class="mt-3 form-control profileInput" placeholder="First Name" />
                    
                    <label class="mt-3">Last Name:</label>
                    <input v-model="newInfo.lastName" class="mt-3 form-control profileInput" placeholder="Last Name" />
                    
                    <label class="mt-3">E-Mail:</label>
                    <input v-model="newInfo.email" class="mt-3 form-control profileInput" placeholder="E-Mail" />

                    <label class="mt-3">Date of Birth:</label>
                    <input v-model="newInfo.dob" type="Date" class="mt-3 form-control profileInput text-uppercase" />
                    
                    <button @click="saveNewInfo()" class="mt-3 btn bg-danger text-light" style="font-weight: bold; font-size: .8em;" type="submit">SAVE CHANGES</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['userInfo', 'profileImage'],
    data () {
        return {
            newInfo: {
                firstName: this.userInfo.firstName,
                lastName: this.userInfo.lastName,
                email: this.userInfo.email,
                dob: this.userInfo.dob
                },
            editShow: false,
            newImage: ""
        }
    },
    methods: {
        editInfo () {
            this.editShow = true;
        },
        selectNew (e) {
          this.newImage = e.target.value.slice(12);
        },
        uploadImage () {
          this.$emit("uploadImage", this.newImage);
        },
        saveNewInfo () {
            let {userInfo, newInfo} = this;
            let allInfo = JSON.parse(localStorage.getItem("allInfo"));
            for (let i = 0; i < allInfo.length; i++) {
                if (allInfo[i].email == userInfo.email) {
                    let updatedInfo = {...allInfo[i], firstName: newInfo.firstName, lastName: newInfo.lastName, email: newInfo.email, dob: newInfo.dob};
                    allInfo[i] = updatedInfo;
                    localStorage.setItem("loginUser", JSON.stringify(updatedInfo));
                    localStorage.setItem("allInfo", JSON.stringify(allInfo));
                    this.editShow = false;
                }
            }
        }
    }
}
</script>

<style>
.profileInput {
    font-size: .9em;
    margin-right: auto;
    margin-left: auto;
    width: 320pt;
}
#profileContainer {
    background-color: rgb(63,123,195);
    font-family: serif;
    font-size: 1.5em;
    font-weight: bold;
    height: 400pt;
    width: 381pt;
}
</style>