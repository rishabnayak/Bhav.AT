<template>
  <main>
    <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">Chats</h1>
        </div>
      </section>
    <div class="container">
        <masonry
          :cols="{default: 3, 991: 2, 767: 1}"
          :gutter="{default: '30px', 767: '15px'}"
          >
        <div v-for="chat in chats" :key="chat.id" class="card mb-4 box-shadow">
          <div class="card-header"><h2 class="my-0 font-weight-normal">{{chat.data().chatRoomID[5]}}</h2></div>
          <div class="card-body">
            <h4 class="card-title">Most Recent</h4>
              <p>{{getValue(chat.data().messages.pop())}}</p>
            <div class="row justify-content-center align-items-center">
              <div class="col-auto">
                <router-link :to="{ name: 'chat', params: {uname:getChatLink(chat.data().chatRoomID[2],chat.data().chatRoomID[3])} }">
                <button class="btn btn-lg btn-block btn-primary">Chat</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </masonry>
      <comments/>
    </div>
  </main>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init.js'
import comments from '@/components/addons/comments'
export default {
  name: 'allusers',
  components: {
    comments
  },
  computed:{
    user () {
      return this.$store.state.user
    }
  },
  methods:{
    getValue(inp){
      if (inp == undefined) {
        return "No messages here"
      } else {
        let out = inp.sender+": "+inp.value
        return out
      }
    },
    getChatLink (in1, in2){
      if (this.user.uname == in1) {
        return in2
      } else {
        return in1
      }
    }
  },
  data () {
    return {
      chats: null
    }
  },
  async created(){
    let findChats = await db.collection('chats').where("chatRoomID", "array-contains", this.user.uname).get()
    this.chats = findChats.docs
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
