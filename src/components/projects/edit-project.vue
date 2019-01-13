<template>
<main>
  <div class="container">
    <div class="jumbotron">
      <h4 class="mb-3">Project {{name}}</h4>
      <form>
        <div class="mb-3">
          <label for="intro">Short Introduction</label>
          <textarea class="form-control" rows="3" id="intro" v-model="intro"></textarea>
        </div>
        <div class="mb-3">
          <label for="codesigner">Co-Designer Description</label>
          <textarea class="form-control" rows="5" id="codesigner" v-model="codesigner"></textarea>
        </div>
        <div class="mb-3">
          <label for="challenge">Challenge Description</label>
          <textarea class="form-control" rows="5" id="challenge" v-model="challenge"></textarea>
        </div>
        <div class="mb-3">
          <label for="solution">Solution Description</label>
          <textarea class="form-control" rows="5" id="solution" v-model="solution"></textarea>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="city">City</label>
            <input type="text" class="form-control" id="city" v-model="city">
          </div>
          <div class="col-md-4 mb-3">
            <label for="state">State</label>
            <input type="text" class="form-control" id="state" v-model="stt">
          </div>
          <div class="col-md-4 mb-3">
            <label for="country">Country</label>
            <input type="text" class="form-control" id="country" v-model="country">
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3">
            <h6 class="mb-3">Members</h6>
            <p v-for="member in members" :key="member.id">
              <router-link :to="{ name: 'profile', params: {uname:member} }"><span class="members">{{ member }}</span></router-link>
            </p>
            <label for="member">Member Username</label>
            <div class="input-group">
              <input type="text" class="form-control" id="member" onpaste="return false" v-model="member" @input="checkMember()">
              <button :disabled="membernonexistent||memberempty||memberregd" class="btn" @click.prevent="addMember()">Add</button>
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
          <div class="col-md-4 mb-3">
            <h6 class="mb-3">Disabilities</h6>
            <p v-for="disability in disabilities" :key="disability.id">
              <span class="members">{{ disability }}</span>
            </p>
            <label for="member">Disability</label>
            <div class="input-group">
              <input type="text" class="form-control" id="tag" onpaste="return false" v-model="disability" @input="checkDisability()">
              <button :disabled="disabilityempty||disabilityregd" class="btn" @click.prevent="addDisability()">Add</button>
              <div class="availability">
                <i v-if="disabilityempty" class="material-icons red">close</i>
                <i v-else-if="disabilityregd" class="material-icons red">close</i>
                <i v-else-if="disabilitysuccess" class="material-icons green">check</i>
              </div>
            </div>
            <p v-if="disabilityempty" class="red availability">Enter a Disability</p>
            <p v-else-if="disabilityregd" class="red availability">Disability already added!</p>
            <p v-else-if="disabilitysuccess" class="green availability">Add Disability!</p>
          </div>
          <div class="col-md-4 mb-3">
            <h6 class="mb-3">Technologies</h6>
            <p v-for="technology in technologies" :key="technology.id">
              <span class="members">{{ technology }}</span>
            </p>
            <label for="member">Technology</label>
            <div class="input-group">
              <input type="text" class="form-control" id="tag" onpaste="return false" v-model="technology" @input="checkTechnology()">
              <button :disabled="technologyempty||technologyregd" class="btn" @click.prevent="addTechnology()">Add</button>
              <div class="availability">
                <i v-if="technologyempty" class="material-icons red">close</i>
                <i v-else-if="technologyregd" class="material-icons red">close</i>
                <i v-else-if="technologysuccess" class="material-icons green">check</i>
              </div>
            </div>
            <p v-if="technologyempty" class="red availability">Enter a Technology</p>
            <p v-else-if="technologyregd" class="red availability">Technology already added!</p>
            <p v-else-if="technologysuccess" class="green availability">Add Technology!</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-5 mb-3">
            <label for="completion">Estimated Date of Completion</label>
            <input type="text" class="form-control" id="completion" v-model="completion">
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3">
            <h6 class="mb-3">Development Stage</h6>
            <div class="custom-control custom-radio">
              <input id="idea" name="devstage" type="radio" class="custom-control-input" checked="" required="" value="idea" v-model="devstage">
              <label class="custom-control-label" for="idea">Idea</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="prototype" name="devstage" type="radio" class="custom-control-input" checked="" required="" value="prototype" v-model="devstage">
              <label class="custom-control-label" for="prototype">Prototype</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="product" name="devstage" type="radio" class="custom-control-input" checked="" required="" value="product" v-model="devstage">
              <label class="custom-control-label" for="product">Product</label>
            </div>
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
        <h6 class="mb-3 mt-3">Videos</h6>
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
        <h6 class="mb-3">Other Files</h6>
        <div class="uploader d-flex flex-column justify-content-center align-items-center rounded">
          <p>{{mediaText}}</p>
          <input id="filePhoto" type="file" accept="media_type" @change="onFileUpload($event)">
        </div>
        <div v-if="this.mediafiles.length !=0">
          <div v-for="file in mediafiles" :key="file.id" class="my-3 p-3 bg-white rounded shadow-sm">
            <div class="media text-muted pt-3">
              <a :href="file.url">
                <figure>
                <img class="mr-2 rounded filestyle" src="@/assets/file.png">
                <figcaption>{{file.name}}</figcaption>
              </figure>
              </a>
              <div class="media-body pb-3 mb-0 small lh-125 border-gray">
                <div class="d-flex justify-content-between align-items-center w-100">
                  <span class="btn text-muted" @click="deleteFile(file.path)">Remove</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="mb-4">
      </form>
      <button class="btn btn-primary btn-lg btn-block col-md-3" type="submit" @click.prevent="updateProject()">Update</button>
    </div>
  </div>
  <hr class="featurette-divider">

  <footer class="container">
    <p class="float-right"><a href="#">Back to top</a></p>
    <p>© 2018 Bhav.AT ·
      <a>
        <router-link :to="{ name: 'privacy'}">Privacy</router-link>
      </a>
    </p>
  </footer>
</main>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init.js'
export default {
  name: 'editproject',
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    async addMember() {
      const ref = db.collection('projects').doc(this.id)
      const refGet = await ref.get()
      this.members = refGet.data().members
      if (this.membernonexistent == false || this.memberempty == false || this.memberregd == false) {
        this.members.push(
          this.member
        )
        await ref.update({
          members: this.members
        })
        this.member = null
        this.memberexists = null
      } else {
        return
      }
    },
    async updateProject() {
      const ref = db.collection('projects').doc(this.id)
      const refGet = await ref.get()
      await ref.update({
        intro: this.intro,
        challenge: this.challenge,
        codesigner: this.codesigner,
        solution: this.solution,
        city: this.city,
        stt: this.stt,
        country: this.country,
        tags: [this.city, this.stt, this.country, ...this.disabilities, ...this.members, ...this.technologies, this.completion, this.devstage],
        completion: this.completion,
        devstage: this.devstage
      })
      this.$router.push({
        name: "project",
        params: {
          name: this.name
        }
      })
    },
    async deleteImage(path) {
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
    async deleteVideo(path) {
      const ref = db.collection('projects').doc(this.id)
      const storage = firebase.storage().ref()
      const firestorageRef = storage.child(path)
      let data = await ref.get()
      this.videos = data.data().videos.filter(video => video.path != path)
      firestorageRef.delete().then(function() {}).catch(function(error) {
        // Uh-oh, an error occurred!
      });
      await ref.update({
        videos: this.videos
      });
      location.reload()
    },
    async deleteFile(path) {
      const ref = db.collection('projects').doc(this.id)
      const storage = firebase.storage().ref()
      const firestorageRef = storage.child(path)
      let data = await ref.get()
      this.mediafiles = data.data().media.filter(media => media.path != path)
      firestorageRef.delete().then(function() {}).catch(function(error) {
        // Uh-oh, an error occurred!
      });
      await ref.update({
        media: this.mediafiles
      });
      location.reload()
    },
    async onFileChanged(obj) {
      this.image = obj.target.files[0]
      this.imageText = "Uploading..."
      this.fileName = Date.now()
      this.storagePath = "projects/" + this.name + "/" + this.fileName
      const storage = firebase.storage().ref()
      const ref = storage.child(this.storagePath)
      await ref.put(this.image)
      const url = await ref.getDownloadURL()
      const projRef = db.collection('projects').doc(this.id)
      const projRefGet = await projRef.get()
      this.images = projRefGet.data().images
      this.images.push({
        url: url,
        path: this.storagePath
      })
      await projRef.update({
        images: this.images
      })
      location.reload()
    },
    async onVideoUpload(obj) {
      this.video = obj.target.files[0]
      this.videoText = "Uploading..."
      this.videoFileName = Date.now()
      this.videoStorage = "projects/" + this.name + "/" + this.videoFileName
      const storage = firebase.storage().ref()
      const ref = storage.child(this.videoStorage)
      await ref.put(this.video)
      const url = await ref.getDownloadURL()
      const projRef = db.collection('projects').doc(this.id)
      const projRefGet = await projRef.get()
      this.videos = projRefGet.data().videos
      this.videos.push({
        url: url,
        path: this.videoStorage
      })
      await projRef.update({
        videos: this.videos
      })
      location.reload()
    },
    async onFileUpload(obj) {
      this.media = obj.target.files[0]
      this.mediaText = "Uploading..."
      this.mediaFileName = Date.now()
      this.mediaStorage = "projects/" + this.name + "/" + this.mediaFileName
      const actualname = this.media.name
      const storage = firebase.storage().ref()
      const ref = storage.child(this.mediaStorage)
      await ref.put(this.media)
      const url = await ref.getDownloadURL()
      const projRef = db.collection('projects').doc(this.id)
      const projRefGet = await projRef.get()
      this.mediafiles = projRefGet.data().media
      this.mediafiles.push({
        url: url,
        path: this.mediaStorage,
        name: actualname
      })
      await projRef.update({
        media: this.mediafiles
      })
      location.reload()
    },
    async checkMember() {
      let membercheck = await db.collection('users').where("uname", "==", this.member).get()
      let check = this.members.find(item => item == this.member)
      if (this.member == null || this.member == "") {
        this.memberempty = true
      } else if (membercheck.empty) {
        this.memberexists = false
        this.memberempty = false
        this.membernonexistent = true
        this.memberregd = false
      } else if (check != undefined) {
        this.memberexists = false
        this.memberempty = false
        this.membernonexistent = false
        this.memberregd = true
      } else {
        this.memberexists = true
        this.memberempty = false
        this.membernonexistent = false
        this.memberregd = false
      }
    },
    async checkDisability() {
      let check = this.disabilities.find(disability => disability == this.disability)
      if (this.disability == null || this.disability == "") {
        this.disabilityempty = true
      } else if (check == undefined) {
        this.disabilityempty = false
        this.disabilityregd = false
        this.disabilitysuccess = true
      } else if (check != undefined) {
        this.disabilityempty = false
        this.disabilityregd = true
        this.disabilitysuccess = false
      }
    },
    async addDisability() {
      const ref = db.collection('projects').doc(this.id)
      const refGet = await ref.get()
      this.disabilities = refGet.data().disabilities
      if (this.disabilitysuccess) {
        this.disabilities.push(
          this.disability
        )
        await ref.update({
          disabilities: this.disabilities
        })
        this.disability = null
        this.disabilitysuccess = null
      } else {
        return
      }
    },
    async checkTechnology() {
      let check = this.technologies.find(technology => technology == this.technology)
      if (this.technology == null || this.technology == "") {
        this.technologyempty = true
      } else if (check == undefined) {
        this.technologyempty = false
        this.technologyregd = false
        this.technologysuccess = true
      } else if (check != undefined) {
        this.technologyempty = false
        this.technologyregd = true
        this.technologysuccess = false
      }
    },
    async addTechnology() {
      const ref = db.collection('projects').doc(this.id)
      const refGet = await ref.get()
      this.technologies = refGet.data().technologies
      if (this.technologysuccess) {
        this.technologies.push(
          this.technology
        )
        await ref.update({
          technologies: this.technologies
        })
        this.technology = null
        this.technologysuccess = null
      } else {
        return
      }
    }
  },
  data() {
    return {
      name: this.$route.params.name,
      intro: null,
      challenge: null,
      codesigner: null,
      solution: null,
      member: null,
      memberempty: null,
      memberexists: null,
      membernonexistent: null,
      members: null,
      id: null,
      memberregd: null,
      imageText: 'Click/Drag to Upload Project Pictures',
      images: [],
      image: null,
      storagePath: null,
      fileName: null,
      videos: [],
      video: null,
      videoStorage: null,
      videoFileName: null,
      videoText: 'Click/Drag to Upload Project Video',
      mediafiles: [],
      media: null,
      mediaStorage: null,
      mediaFileName: null,
      mediaText: 'Click/Drag to Upload Other Files',
      city: null,
      stt: null,
      country: null,
      disabilities: null,
      disability: null,
      disabilityempty: null,
      disabilityregd: null,
      disabilitysuccess: null,
      technologies: null,
      technology: null,
      technologyempty: null,
      technologyregd: null,
      technologysuccess: null,
      completion: null,
      devstage: null
    }
  },
  async created() {
    let projectcheck = await db.collection('projects').where("name", "==", this.name).get()
    this.id = projectcheck.docs[0].id
    this.intro = projectcheck.docs[0].data().intro
    this.members = projectcheck.docs[0].data().members
    this.images = projectcheck.docs[0].data().images
    this.videos = projectcheck.docs[0].data().videos
    this.mediafiles = projectcheck.docs[0].data().media
    this.challenge = projectcheck.docs[0].data().challenge
    this.codesigner = projectcheck.docs[0].data().codesigner
    this.solution = projectcheck.docs[0].data().solution
    this.city = projectcheck.docs[0].data().city
    this.stt = projectcheck.docs[0].data().stt
    this.country = projectcheck.docs[0].data().country
    this.disabilities = projectcheck.docs[0].data().disabilities
    this.technologies = projectcheck.docs[0].data().technologies
    this.completion = projectcheck.docs[0].data().completion
    this.devstage = projectcheck.docs[0].data().devstage
    let check = this.members.find(item => item == this.user.uname)
    if (check != undefined) {
      return
    } else {
      this.$router.push({
        name: "project",
        params: {
          name: this.$route.params.name
        }
      })
    }
  }
}
</script>

<style>
.imgstyle {
  display: block;
  max-width: 300px;
  max-height: 200px;
  width: auto;
  height: auto;
}

.filestyle {
  display: block;
  max-width: 50px;
  max-height: 50px;
  width: auto;
  height: auto;
}

.uploader {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 300px;
  background: #f3f3f3;
  border: 2px;
}

#filePhoto {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.container {
  padding-top: 40px;
  padding-bottom: 40px;
}

.material-icons.green {
  color: green;
}

.material-icons.red {
  color: red;
}

.availability {
  padding-top: 6px;
  padding-left: 3px;
}

.members {
  padding-left: 3px;
}

.green {
  color: green;
}

.red {
  color: red;
}
</style>
