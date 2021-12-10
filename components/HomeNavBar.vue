<template>
    <div>
<!-- Home -->
        <router-link @click="home" :to="{name: 'home'}" class="mt-3 navbar-toggler nav-link text-light" :style="colors.homeColor" >
            <img src="../components/images/Home.png" style="height: 30px; width: 30px;" alt="Home" />
            <span class="p-4 h4">HOME</span>
        </router-link>
<!-- Profile         -->
        <router-link @click="profile" :to="{name: 'home'}" class="mt-3 navbar-toggler nav-link text-light" :style="colors.profileColor" >
            <img src="../components/images/Profile.png" alt="Profile" class="navImage" />
            <span class="p-4 h4">PROFILE</span>
        </router-link>
<!-- Transfer         -->
        <router-link @click="transfer" :to="{name: 'home'}" class="mt-3 navbar-toggler nav-link text-light" :style="colors.transferColor">
            <img src="../components/images/Transfer.png" alt="Transfer" class="navImage" />
            <span class="p-4 h4">TRANSFER</span>
        </router-link>
<!-- Notification     -->
        <router-link @click="notification" :to="{name: 'home'}" class="mt-3 navbar-toggler nav-link text-light" :style="colors.notificationColor">
            <img src="../components/images/Notification.png" alt="Notification" class="navImage" />
            <span class="p-4 h4">NOTIFICATION</span>
        </router-link>
<!-- Log Out -->
        <router-link :to="{name: 'home'}" class="mt-3 navbar-toggler nav-link text-light" @click="logOut()">
            <img src="../components/images/Logout.png" alt="Log Out" class="navImage" />
            <span class="p-4 h4">LOG OUT</span>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['profile', 'home', 'transfer', 'notification', 'colors'],
    methods: {
        logOut () {
            localStorage.removeItem("loginUser");
            this.$router.push({name: "login"});
        }
    }
}
</script>

<style>
.navImage {
    height: 30px;
    width: 30px;
}
</style>