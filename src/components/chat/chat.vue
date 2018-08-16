<template>
  <main>
    <div class="jumbotron">
      <h1 align="center">Chat with {{chatWith}}</h1>
        <div class="my-3 p-3 bg-white rounded shadow-sm scroll" v-chat-scroll>
          <div class="media text pt-3">
            <div>
              <div class="media-body pb-3 mb-0 lh-125" v-for="message in messages" :key="message.id">
                <span>{{ message.value }}</span>
                <span class="text-muted">{{ message.sender }}, {{ makeTimeReadable(message.timestamp) }}</span>
                <a v-if="user.uname == message.sender" class="btn text-right text-muted" @click.prevent="delChat(message.timestamp)">Delete</a>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <form>
              <div class="input-group add-on">
                <input type="text" class="form-control" id="newMessage" placeholder="Send a message..." v-model="newMessage" @input="checkInput()">
                <div class="input-group-btn">
                  <button :disabled="disableSend" class="btn btn-primary" @click.prevent="sendMessage()">Send</button>
               </div>
              </div>
            </form>
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
import moment from 'moment'
import firebase from 'firebase'
import db from '@/firebase/init.js'
export default {
  name: 'chat',
  computed:{
    user () {
      return this.$store.state.user
    }
  },
  data () {
    return {
      uname: this.$route.params.uname,
      chatWith: null,
      chatID: null,
      messages: [],
      newMessage: null,
      disableSend: null
    }
  },
  methods: {
    async sendMessage (){
        let dataref = db.collection('chats').doc(this.chatID)
        let data = await dataref.get()
        this.messages = data.data().messages
        this.messages.push({
          value: this.newMessage,
          sender: this.user.uname,
          timestamp: Date.now()
        })
        await dataref.update({
          messages: this.messages
        })
        this.newMessage = null
    },
    async checkInput (){
      if (this.newMessage == null || this.newMessage == "") {
        this.disableSend = true
      }
      else {
        this.disableSend = false
      }
    },
    async delChat (timestamp){
        let dataref = db.collection('chats').doc(this.chatID)
        let data = await dataref.get()
        this.messages = data.data().messages.filter(message => message.timestamp != timestamp)
        await dataref.update({
           messages: this.messages
         })
       },
  makeTimeReadable (timestamp) {
    return moment(timestamp).format("lll")
    }
  },
  async created(){
    let findUser = await db.collection('users').where("uname", "==", this.uname).get()
    if (findUser.empty) {
      this.$router.push({ name: "allchats"})
    }
    else {
    this.chatWith = findUser.docs[0].data().displayName
    let chatRoomID = [this.uname+this.user.uname, this.user.uname+this.uname, this.user.uname, this.uname, this.user.displayName, this.chatWith]
    let findChat = await db.collection('chats').where("chatRoomID", "array-contains", this.user.uname+this.uname).get()
    const ref = db.collection('chats')
    if (findChat.empty) {
      await ref.add({
        messages: [],
        chatRoomID:chatRoomID
      })
      location.reload()
    }
    else {
      this.chatID = findChat.docs[0].id
    }
    const msgref = db.collection('chats').doc(this.chatID)
    msgref.onSnapshot(docSnapshot => {
      this.messages = docSnapshot.data().messages
    })
    this.disableSend = true
    }
  }
}
</script>

<style scoped>
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

.scroll{
  position: relative;
  z-index: 10;
  max-height: 400px;
  overflow-y: scroll;
}

.add-on .input-group-btn > .btn {
  border-left-width:0;left:-2px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}

.add-on .form-control:focus {
 box-shadow:none;
 -webkit-box-shadow:none;
 border-color:#cccccc;
}

.text-muted {
  display: block;
  font-size: 0.8rem;
}

.material-icons.md-18 { font-size: 18px; }
.material-icons.md-24 { font-size: 24px; }
.material-icons.md-36 { font-size: 36px; }
.material-icons.md-48 { font-size: 48px; }

</style>
