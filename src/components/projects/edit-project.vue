<template>
  <main>
  <div class="container">
    <div class="jumbotron">
            <h4 class="mb-3">Project {{name}}</h4>
            <form>
              <div class="mb-3">
                <label for="intro">Short Introduction</label>
                <textarea class="form-control" rows="5" id="intro" v-model="intro"></textarea>
              </div>
              <h6 class="mb-3">Members</h6>
                <p v-for="member in members" :key="member.id">
                    <router-link :to="{ name: 'profile', params: {uname:member} }"><span class="members">{{ member }}</span></router-link>
                </p>
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <a class="btn btn-primary" @click="showMember = !showMember && checkMember()">Add Member</a>
                  </div>
                </div>
              <div v-if="showMember" class="row">
                <div class="col-md-auto mb-3">
                  <label for="member">Member Username</label>
                  <div class="input-group">
                    <input type="text" class="form-control" id="member" onpaste="return false" v-model="member" @input="checkMember()">
                    <div class="availability">
                      <i v-if="memberempty" class="material-icons red">close</i>
                      <i v-else-if="memberregd" class="material-icons red">close</i>
                      <i v-else-if="memberexists" class="material-icons green">check</i>
                      <i v-else-if="membernonexistent" class="material-icons red">close</i>
                    </div>
                  </div>
                    <p v-if="memberempty" class="red availability">Enter a Username</p>
                    <p v-else-if="memberregd" class="red availability">Member already registered!</p>
                    <p v-else-if="memberexists" class="green availability">Member found!</p>
                    <p v-else-if="membernonexistent" class="red availability">Member not found!</p>
                </div>
              </div>
              <h6 class="mb-3">Images</h6>
                <div class="uploader d-flex flex-column justify-content-center align-items-center rounded">
                  <p>{{imageText}}</p>
                  <input id="filePhoto" type="file" accept="image/*" @change="onFileChanged($event)">
                </div>
                <div v-if="this.images.length !=0">
                  <div v-for="image in images" :key="image.id" class="my-3 p-3 bg-white rounded shadow-sm">
                    <div class="media text-muted pt-3">
                      <img class="mr-2 rounded imgstyle" :src="image.url" data-holder-rendered="true">
                      <div class="media-body pb-3 mb-0 small lh-125 border-gray">
                        <div class="d-flex justify-content-between align-items-center w-100">
                          <span class="btn text-muted" @click="deleteImage(image.path)">Remove</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h6 class="mb-3 mt-3">Video</h6>
                  <div class="uploader d-flex flex-column justify-content-center align-items-center rounded">
                    <p>{{videoText}}</p>
                    <input id="filePhoto" type="file" accept="video/*" @change="onVideoUpload($event)">
                  </div>
                  <div v-if="this.videos.length != 0">
                    <div v-for="video in videos" :key="video.id" class="my-3 p-3 bg-white rounded shadow-sm">
                      <div class="media text-muted pt-3">
                        <video class="mr-2 rounded imgstyle" :src="video.url" data-holder-rendered="true"></video>
                        <div class="media-body pb-3 mb-0 small lh-125 border-gray">
                          <div class="d-flex justify-content-between align-items-center w-100">
                            <span class="btn text-muted" @click="deleteVideo(video.path)">Remove</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              <hr class="mb-4">
            </form>
            <button :disabled="membernonexistent||memberempty||memberregd" class="btn btn-primary btn-lg btn-block col-md-3" type="submit" @click="updateProject()">Update</button>
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
  name: 'editproject',
  computed:{
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    async updateProject () {
      const ref = db.collection('projects').doc(this.id)
      const refGet = await ref.get()
      this.members = refGet.data().members
      if (this.member == null) {
        await ref.update({
          intro: this.intro,
        })
      }
      else {
        this.members.push(
          this.member
        )
        await ref.update({
          intro: this.intro,
          members: this.members
        })
      }
      this.member = null
      this.showMember = false
      this.$router.push({ name: "project", params: {name:this.name}})
    },
    async deleteImage (path) {
      const ref = db.collection('projects').doc(this.id)
      const storage = firebase.storage().ref()
      const firestorageRef = storage.child(path)
      let data = await ref.get()
      this.images = data.data().images.filter(image => image.path != path)
      firestorageRef.delete().then(function() {
          // File deleted successfully
        }).catch(function(error) {
          // Uh-oh, an error occurred!
        });
      await ref.update({
        images: this.images
      });
      location.reload()
    },
    async deleteVideo (path) {
      const ref = db.collection('projects').doc(this.id)
      const storage = firebase.storage().ref()
      const firestorageRef = storage.child(path)
      let data = await ref.get()
      this.videos = data.data().videos.filter(video => video.path != path)
      firestorageRef.delete().then(function() {
          // File deleted successfully
        }).catch(function(error) {
          // Uh-oh, an error occurred!
        });
      await ref.update({
        videos: this.videos
      });
      location.reload()
    },
    async onFileChanged (obj) {
      this.image = obj.target.files[0]
      this.imageText = "Uploading..."
      this.fileName = Date.now()
      this.storagePath = "projects/"+this.name+"/"+this.fileName
      const storage = firebase.storage().ref()
      const ref = storage.child(this.storagePath)
      await ref.put(this.image).then(function(snapshot) {
        this.imageText = obj.target.files[0].name+" Uploaded!"
      });
      const url = await ref.getDownloadURL()
      const projRef = db.collection('projects').doc(this.id)
      const projRefGet = await projRef.get()
      this.images = projRefGet.data().images
      this.images.push(
        {url:url,path:this.storagePath}
      )
      await projRef.update({
        images: this.images
      })
      location.reload()
    },
    async onVideoUpload (obj) {
      this.video = obj.target.files[0]
      this.videoText = "Uploading..."
      this.videoFileName = Date.now()
      this.videoStorage = "projects/"+this.name+"/"+this.videoFileName
      const storage = firebase.storage().ref()
      const ref = storage.child(this.videoStorage)
      await ref.put(this.video).then(function(snapshot) {
        this.videoText = obj.target.files[0].name+" Uploaded!"
      });
      const url = await ref.getDownloadURL()
      const projRef = db.collection('projects').doc(this.id)
      const projRefGet = await projRef.get()
      this.videos = projRefGet.data().videos
      this.videos.push(
        {url:url,path:this.videoStorage}
      )
      await projRef.update({
        videos: this.videos
      })
      location.reload()
    },
    async checkMember () {
      let membercheck = await db.collection('users').where("uname", "==", this.member).get()
      let check = this.members.find(item => item == this.member)
      if (this.member == null || this.member == "") {
        this.memberempty = true
      } else if (membercheck.empty) {
        this.memberexists = false
        this.memberempty = false
        this.membernonexistent = true
        this.memberregd = false
      }
      else if (check != undefined){
        this.memberexists = false
        this.memberempty = false
        this.membernonexistent = false
        this.memberregd = true
      }
      else {
        this.memberexists = true
        this.memberempty = false
        this.membernonexistent = false
        this.memberregd = false
      }
    }
  },
  data () {
    return {
      name: this.$route.params.name,
      intro: null,
      member: null,
      memberempty: null,
      memberexists: null,
      membernonexistent: null,
      showMember: false,
      members: null,
      id: null,
      memberregd:null,
      imageText: 'Click/Drag to Upload Project Pictures',
      images:[],
      image:null,
      storagePath: null,
      fileName: null,
      videos: [],
      video: null,
      videoStorage: null,
      videoFileName: null,
      videoText: 'Click/Drag to Upload Project Video'
    }
  },
  async created(){
    let projectcheck = await db.collection('projects').where("name", "==", this.name).get()
    this.id = projectcheck.docs[0].id
    this.intro = projectcheck.docs[0].data().intro
    this.members = projectcheck.docs[0].data().members
    this.images = projectcheck.docs[0].data().images
    this.videos = projectcheck.docs[0].data().videos
    this.imageCheck = projectcheck.docs[0].data().images
    this.videoCheck = projectcheck.docs[0].data().videos
    let check = this.members.find(item => item == this.user.uname)
    if (check != undefined) {
      return
    }
    else {
      this.$router.push({ name: "project", params: {name:this.$route.params.name}})
    }
  }
}
</script>

<style>
.imgstyle{
  display: block;
  max-width:300px;
  max-height:200px;
  width: auto;
  height: auto;
}
.uploader {
  position:relative;
  overflow:hidden;
  width:100%;
  height:300px;
  background:#f3f3f3;
  border:2px;
}
#filePhoto{
    position:absolute;
    width:100%;
    height:100%;
    opacity:0;
    cursor:pointer;
}
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

.members{
  padding-left: 3px;
}

.green{
  color: green;
}

.red{
  color: red;
}

</style>
