<template>
  <main>
    <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">All Users</h1>
        </div>
      </section>
    <div class="container">
        <masonry
          :cols="{default: 3, 991: 2, 767: 1}"
          :gutter="{default: '30px', 767: '15px'}"
          >
        <div v-for="user in users" :key="user.id" class="card mb-4 box-shadow">
          <div class="card-header"><h2 class="my-0 font-weight-normal">{{user.data().displayName}}</h2><span>Username: {{user.data().uname}}</span></div>
          <div class="card-body">
            <h4 class="card-title" align="center">Short Introduction</h4>
              <p>{{user.data().bio}}</p>
            <div class="row justify-content-center align-items-center">
              <div class="col-auto">
                <router-link :to="{ name: 'profile', params: {uname:user.data().uname} }">
                <button class="btn btn-lg btn-block btn-primary">View Profile</button>
                </router-link>
              </div>
              <div class="col-auto">
                <router-link :to="{ name: 'chat', params: {uname:user.data().uname} }">
                <button class="btn btn-lg btn-block btn-primary">Chat</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </masonry>
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
  name: 'allusers',
  computed:{
    user () {
      return this.$store.state.user
    }
  },
  data () {
    return {
      users: null
    }
  },
  async created(){
    let usersGet = await db.collection('users').get()
    this.users = usersGet.docs
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
