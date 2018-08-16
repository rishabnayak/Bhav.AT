<template>
  <main>
  <div class="container">
    <div class="jumbotron">
      <h1 align="center">Project {{pname}}</h1>
      <h4 class="section-head">Short Introduction</h4>
        <p class="content">{{intro}}</p>
      <h4 class="section-head">Members</h4>
        <p v-for="member in members" :key="member.id" class="content">
            <router-link :to="{ name: 'profile', params: {uname:member} }"><span class="members">{{ member }}</span></router-link>
        </p>
        <div class="row mb-2">
          <div class="col">
            <router-link :to="{ name: 'editproject', params: {name:this.$route.params.name} }">
              <button v-if="userCheck" class="btn btn-primary btn-lg btn-block col-md-6">Update</button>
            </router-link>
          </div>
          <div class="col">
            <router-link :to="{ name: 'projectchat', params: {name:this.$route.params.name} }">
              <button v-if="userCheck" class="btn btn-primary btn-lg btn-block col-md-6">Chat</button>
            </router-link>
          </div>
        </div>
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
  name: 'project',
  computed:{
    user () {
      return this.$store.state.user
    }
  },
  data () {
    return {
      name: this.$route.params.name,
      intro: null,
      members: null,
      userCheck: null,
      pname: null
    }
  },
  async created(){
    let projectcheck = await db.collection('projects').where("name", "==", this.name).get()
      this.pname = projectcheck.docs[0].data().name
      this.intro = projectcheck.docs[0].data().intro
      this.members = projectcheck.docs[0].data().members
      let check = this.members.find(item => item == this.user.uname)
      if (check != undefined) {
        this.userCheck = true
      } else {
        this.userCheck = false
      }
  }
}
</script>

<style>
.container{
  padding-top: 40px;
  padding-bottom: 40px;
}
.material-icons.green { color: green;
}

.material-icons.red { color: red;
}

.availability{
  padding-top: 6px;
  padding-left: 3px;
}

.section-head{
  padding-left: 8px
}

.content{
  padding-left: 12px
}

.green{
  color: green;
}

.red{
  color: red;
}

</style>
