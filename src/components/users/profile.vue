<template>
  <main>
  <div class="container">
    <div class="jumbotron">
      <div v-if="user.profilePic==undefined" style="text-align:center">
        <i class="material-icons md-48">account_circle</i>
      </div>
      <div v-else style="text-align:center">
        <img class="round img" :src="imgURL"></img>
      </div>
      <h1 align="center">{{displayname}}</h1>
      <h4 class="section-head">Bio</h4>
      <p class="content">{{bio}}</p>
      <h4 class="section-head">City</h4>
      <p class="content">{{city}}</p>
      <h4 class="section-head">State</h4>
      <p class="content">{{stt}}</p>
      <h4 class="section-head">Country</h4>
      <p class="content">{{country}}</p>
      <h4 class="section-head">Phone Number</h4>
      <p class="content">{{number}}</p>
      <h4 class="section-head">Current Affiliation</h4>
      <p class="content">{{affiliation}}</p>
      <router-link to="/editprofile">
      <button v-if="userCheck" class="btn btn-primary btn-lg btn-block col-md-3">Update</button>
      </router-link>
    </div>
  </div>
  <hr class="featurette-divider">

<footer class="container">
  <p class="float-right"><a href="#">Back to top</a></p>
  <p>© 2018 Bhav.AT · <a><router-link :to="{ name: 'privacy'}">Privacy</router-link></a></p>
</footer>
</main>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init.js'
export default {
  name: 'profile',
  computed:{
    user () {
      return this.$store.state.user
    }
  },
  data () {
    return {
      uname: this.$route.params.uname,
      displayname: null,
      bio: null,
      city: null,
      stt: null,
      country: null,
      number: null,
      affiliation: null,
      userCheck: null,
      imgURL: null
    }
  },
  async created(){
    let finduser = await db.collection('users').where("uname", "==", this.uname).get()
    if (finduser.empty) {
      this.$router.push({ name: "allusers"})
    }
    else if (this.user.profilePic==undefined) {
      this.bio = finduser.docs[0].data().bio
      this.city = finduser.docs[0].data().city
      this.stt = finduser.docs[0].data().stt
      this.country = finduser.docs[0].data().country
      this.number = finduser.docs[0].data().number
      this.affiliation = finduser.docs[0].data().affiliation
      this.displayname = finduser.docs[0].data().displayName
        if (this.$route.params.uname == this.user.uname) {
          this.userCheck = true
        } else {
          this.userCheck = false
        }
      }
      else {
      this.bio = finduser.docs[0].data().bio
      this.city = finduser.docs[0].data().city
      this.stt = finduser.docs[0].data().stt
      this.country = finduser.docs[0].data().country
      this.number = finduser.docs[0].data().number
      this.affiliation = finduser.docs[0].data().affiliation
      this.displayname = finduser.docs[0].data().displayName
      this.imgURL = finduser.docs[0].data().profilePic[0]
        if (this.$route.params.uname == this.user.uname) {
          this.userCheck = true
        } else {
          this.userCheck = false
        }
      }
  }
}
</script>

<style>

.material-icons.md-18 { font-size: 18px; }
.material-icons.md-24 { font-size: 24px; }
.material-icons.md-36 { font-size: 36px; }
.material-icons.md-48 { font-size: 48px; }

.round {
    border-radius: 50%;
    overflow: hidden;
    width: 150px;
    height: 150px;
}

.round img {
    display: block;
/* Stretch
      height: 100%;
      width: 100%; */
min-width: 100%;
min-height: 100%;
}

h1{
  color: #444;
}

.section-head{
  padding-left: 8px
}

.content{
  padding-left: 12px
}
</style>
