<template>
<main>
  <div class="container">
    <div class="jumbotron">
      <h1 align="center">Project {{pname}}</h1>
      <h4 class="section-head">Short Introduction</h4>
      <p class="content">{{intro}}</p>
      <h4 v-if="codesigner" class="section-head">Codesigner</h4>
      <p v-if="codesigner" class="content">{{codesigner}}</p>
      <h4 v-if="challenge" class="section-head">Challenge</h4>
      <p v-if="challenge" class="content">{{challenge}}</p>
      <h4 v-if="solution" class="section-head">Solution</h4>
      <p v-if="solution" class="content">{{solution}}</p>
      <h5 v-if="city" class="section-head">City</h5>
      <p v-if="city" class="content">{{city}}</p>
      <h5 v-if="stt" class="section-head">State</h5>
      <p v-if="stt" class="content">{{stt}}</p>
      <h5 v-if="country" class="section-head">Country</h5>
      <p v-if="country" class="content">{{country}}</p>
      <h5 v-if="completion" class="section-head">Estimated Completion Date</h5>
      <p v-if="completion" class="content">{{completion}}</p>
      <h5 v-if="devstage" class="section-head">Development Stage</h5>
      <p v-if="devstage" class="content">{{devstage}}</p>
      <h4 class="section-head">Members</h4>
      <p v-for="member in members" :key="member.id" class="content">
        <router-link :to="{ name: 'profile', params: {uname:member} }"><span class="members">{{ member }}</span></router-link>
      </p>
      <h5 v-if="disabilities.length!=0" class="section-head">Disabilities</h5>
      <p v-if="disabilities" class="content" v-for="disability in disabilities" :key="disability.id">
        <span class="members">{{ disability }}</span>
      </p>
      <h5 v-if="technologies.length!=0" class="section-head">Technologies</h5>
      <p v-if="technologies" class="content" v-for="technology in technologies" :key="technology.id">
        <span class="members">{{ technology }}</span>
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
    <h4 v-if="this.images.length != 0" class="section-head">Images</h4>
    <div class="container jumbotron" v-if="this.images.length != 0">
      <masonry :cols="{default: 3, 991: 2, 767: 1}" :gutter="{default: '30px', 767: '15px'}">
        <div v-for="image in images" :key="image.id">
          <img :src="image.url" class="imgstyle">
        </div>
      </masonry>
    </div>
    <h4 v-if="this.videos.length != 0" class="section-head">Videos</h4>
    <div class="container jumbotron" v-if="this.videos.length != 0">
      <masonry :cols="{default: 3, 991: 2, 767: 1}" :gutter="{default: '30px', 767: '15px'}">
        <div v-for="video in videos" :key="video.id">
          <video :src="video.url" width="320" height="240" controls></video>
        </div>
      </masonry>
    </div>
    <h4 v-if="this.media.length != 0" class="section-head">Other Files</h4>
    <div class="container jumbotron" v-if="this.media.length != 0">
      <masonry :cols="{default: 3, 991: 2, 767: 1}" :gutter="{default: '30px', 767: '15px'}">
        <div v-for="file in media" :key="file.id">
          <a :href="file.url">
            <figure>
              <img class="mr-2 rounded filestyle" src="@/assets/file.png">
              <figcaption>{{file.name}}</figcaption>
            </figure>
          </a>
        </div>
      </masonry>
    </div>
    <comments />
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
import comments from '@/components/addons/comments'
export default {
  name: 'project',
  components: {
    comments
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  data() {
    return {
      name: this.$route.params.name,
      intro: null,
      members: null,
      userCheck: null,
      pname: null,
      images: [],
      videos: [],
      media: [],
      codesigner: null,
      challenge: null,
      solution: null,
      city: null,
      stt: null,
      country: null,
      disabilities: null,
      technologies: null,
      completion: null,
      devstage: null
    }
  },
  async created() {
    let projectcheck = await db.collection('projects').where("name", "==", this.name).get()
    this.pname = projectcheck.docs[0].data().name
    this.intro = projectcheck.docs[0].data().intro
    this.members = projectcheck.docs[0].data().members
    this.images = projectcheck.docs[0].data().images
    this.videos = projectcheck.docs[0].data().videos
    this.media = projectcheck.docs[0].data().media
    this.codesigner = projectcheck.docs[0].data().codesigner
    this.challenge = projectcheck.docs[0].data().challenge
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
      this.userCheck = true
    } else {
      this.userCheck = false
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

.section-head {
  padding-left: 8px
}

.content {
  padding-left: 12px
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
