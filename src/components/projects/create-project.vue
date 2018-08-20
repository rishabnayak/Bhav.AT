<template>
<main>
  <div class="container">
    <div class="jumbotron">
      <h4 class="mb-3">Project</h4>
      <form>
        <div class="row">
          <div class="col-md-auto mb-3">
            <label for="name">Project Name</label>
            <div class="input-group">
              <input type="text" class="form-control" id="name" onpaste="return false" v-model="name" @input="checkAvailability()">
              <div class="availability">
                <i v-if="nameempty" class="material-icons red">close</i>
                <i v-else-if="available" class="material-icons green">check</i>
                <i v-else-if="unavailable" class="material-icons red">close</i>
              </div>
            </div>
            <p v-if="nameempty" class="red availability">Enter a Project Name</p>
            <p v-else-if="available" class="green availability">Project Name available!</p>
            <p v-else-if="unavailable" class="red availability">Project Name unavailable!</p>
          </div>
        </div>
        <div class="mb-3">
          <label for="intro">Short Introduction</label>
          <textarea class="form-control" rows="5" id="intro" v-model="intro"></textarea>
        </div>
        <hr class="mb-4">
      </form>
      <button :disabled="unavailable||nameempty" class="btn btn-primary btn-lg btn-block col-md-3" type="submit" @click="createProject()">Create</button>
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
  name: 'createproject',
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    async createProject() {
      const ref = db.collection('projects')
      await ref.add({
        name: this.name,
        intro: this.intro,
        members: [this.user.uname],
        images: [],
        videos: [],
        tags: []
      })
      this.$router.push({
        name: "project",
        params: {
          name: this.name
        }
      })
    },
    async checkAvailability() {
      let checkname = await db.collection('projects').where("name", "==", this.name).get()
      if (this.name == null || this.name == "") {
        this.nameempty = true
      } else if (checkname.empty || checkname.docs[0].data().name == this.user.name) {
        this.available = true
        this.nameempty = false
        this.unavailable = false
      } else {
        this.available = false
        this.nameempty = false
        this.unavailable = true
      }
    }
  },
  data() {
    return {
      intro: null,
      name: null,
      available: null,
      unavailable: null,
      nameempty: null,
    }
  },
  mounted: function() {
    this.checkAvailability()
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

.green {
  color: green;
}

.red {
  color: red;
}
</style>
