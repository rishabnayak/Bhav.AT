<template>
  <main role="main">
    <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">About</h1>
          <p class="lead text-muted">We are the Humanistic Co-Design Initiative</p>
          <p>
            <a class="btn btn-outline-secondary my-2"><router-link :to="{ name: 'connect'}">Reach Out!</router-link></a>
          </p>
        </div>
      </section>

      <main role="main" class="container">
        <div class="row">
          <div class="col-md-12 blog-main">
            <h3 class="pb-3 mb-4 font-italic border-bottom">
              Humanistic Co-Design Initiative
            </h3>

          <div class="blog-post">
            <p>We run assistive technology workshops in cities throughout India and the United States. We build and sell assistive technology devices. We offer mentoring, product development, production and certification services for assistive technologies.
            </p>

        </div><!-- /.blog-post -->

      </div><!-- /.blog-main -->

    </div><!-- /.row -->

  </main>

        <hr class="featurette-divider">

      <footer class="container">
        <p class="float-right"><a href="#">Back to top</a></p>
        <p>© 2018 Humanistic Co-Design Initiative · <a><router-link :to="{ name: 'privacy'}">Privacy</router-link></a></p>
      </footer>
    </main>
</template
