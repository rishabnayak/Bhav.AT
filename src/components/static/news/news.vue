<template>
  <main role="main">
    <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">News</h1>
          <p class="lead text-muted">Upcoming workshops, events, talks, products launches and more from Bhav.AT</p>
        </div>
      </section>

      <main role="main" class="container">
      <div class="row mb-2">
        <div class="col-md-6">
          <div class="card flex-md-row mb-4 shadow-sm h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
              <strong class="d-inline-block mb-2 text-primary">Workshops</strong>
              <h3 class="mb-0">
                <a class="text-dark" href="#">December / January Workshops</a>
              </h3>
              <div class="mb-1 text-muted">Aug 1</div>
              <p class="card-text mb-auto">We are planning December and January workshops for Winter 2018/2019. These will be in cities throughout India. Stay tuned for updates.</p>
              <a><router-link :to="{ name: 'news1'}">Continue reading</router-link></a>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card flex-md-row mb-4 shadow-sm h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
              <strong class="d-inline-block mb-2 text-primary">Workshops</strong>
              <h3 class="mb-0">
                <a class="text-dark" href="#">&lt;Co/LAB> Chennai</a>
              </h3>
              <div class="mb-1 text-muted">Aug 1</div>
              <p class="card-text mb-auto">We are pleased to announce our kickoff event in Chennai on the 10th through the 12th of August. We would love to host you and your team at the hackathon and make a difference in every which way we can.…</p>
              <a><router-link :to="{ name: 'news2'}">Continue reading</router-link></a>
            </div>
          </div>
        </div>
      </div>
    </main>

    <hr class="featurette-divider">

  <footer class="container">
    <p class="float-right"><a href="#">Back to top</a></p>
    <p>© 2018 Bhav.AT · <a><router-link :to="{ name: 'privacy'}">Privacy</router-link></a></p>
  </footer>
    </main>
</template
