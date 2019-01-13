<template>
<main>
  <div class="jumbotron">
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column align-items-center">
      <h1 align="center">All Projects</h1>
      <router-link :to="{ name: 'createproject'}">
        <button class="btn btn-primary">Create Project</button>
      </router-link>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <form>
          <label for="tagSearch">Tag Search</label>
          <div class="input-group add-on">
            <input type="text" class="form-control mr-1" id="tagSearch" placeholder="Search for Project Tags" onpaste="return false" v-model="tagInput" @input="checkTag()">
            <div class="input-group-btn">
              <button class="btn btn-primary" @click.prevent="reset()">Reset</button>
            </div>
          </div>
          <p v-if="tagempty" class="red availability">Enter a Tag</p>
          <p v-else-if="tagfound == false" class="red availability">Tag not found!</p>
          <p v-else-if="tagfound" class="green availability">Tag Valid!</p>
        </form>
      </div>
    </div>
  </div>
  <div class="container">
    <masonry :cols="{default: 3, 991: 2, 767: 1}" :gutter="{default: '30px', 767: '15px'}">
      <div v-for="project in projects" :key="project.id" class="card mb-4 box-shadow">
        <div class="card-header">
          <h2 class="my-0 font-weight-normal">{{project.data().name}}</h2></div>
        <div class="card-body">
          <h4 class="card-title">Short Introduction</h4>
          <p>{{project.data().intro}}</p>
          <h4>Members</h4>
          <p v-for="member in project.data().members" :key="member.id">
            <router-link :to="{ name: 'profile', params: {uname:member} }"><span>{{ member }}</span></router-link>
          </p>
          <router-link :to="{ name: 'project', params: {name:project.data().name} }">
            <button class="btn btn-lg btn-block btn-primary">View</button>
          </router-link>
        </div>
      </div>
    </masonry>
  </div>
  <hr class="featurette-divider">

  <footer class="container">
    <p class="float-right"><a href="#">Back to top</a></p>
    <p>© 2018 Humanistic Co-Design Initiative ·
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
  name: 'allprojects',
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    async checkTag() {
      let check = await db.collection('projects').where("tags", "array-contains", this.tagInput).get()
      if (this.tagInput == null || this.tagInput == "") {
        this.tagempty = true
        let searchresults = await db.collection('projects').get()
        this.projects = searchresults.docs
      } else if (check.empty) {
        this.tagempty = false
        this.tagfound = false
        let searchresults = await db.collection('projects').get()
        this.projects = searchresults.docs
      } else if (check.empty == false) {
        this.tagempty = false
        this.tagfound = true
        let searchresults = await db.collection('projects').where("tags", "array-contains", this.tagInput).get()
        this.projects = searchresults.docs
      }
    },
    async reset() {
      let all = await db.collection('projects').get()
      this.projects = all.docs
      this.tagInput = null
      this.tagempty = null
      this.tagfound = null
    }
  },
  data() {
    return {
      projects: null,
      tagempty: null,
      tagfound: null,
      tagInput: null
    }
  },
  async created() {
    let projectsGet = await db.collection('projects').get()
    this.projects = projectsGet.docs
  }
}
</script>

<style>
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

.green {
  color: green;
}

.red {
  color: red;
}
</style>
