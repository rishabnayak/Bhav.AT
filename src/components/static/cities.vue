<template>
  <main role="main">
    <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">Cities</h1>
          <p class="lead text-muted">Proposed cities for Winter 2018/2019 workshops. <br> Please reach out to us if you would like to participate in some fashion or have connections in other cities.</p>
          <p>
            <a class="btn btn-outline-secondary my-2"><router-link :to="{ name: 'connect'}">Reach Out!</router-link></a>
          </p>
        </div>
      </section>

      <main role="main" class="container">
        <div class="row">
          <div class="col-md-12 blog-main">
            <h3 class="pb-3 mb-4 font-italic border-bottom">
              Future Cities
            </h3>

          <div class="blog-post">

            <ul>
              <li>Chennai</li>
                <ul>
                  <li>August 2018</li>
                  <li>Winter 2018/2019</li>
                </ul>
                <br>
              <li>Kolkata</li>
                <ul>
                  <li>Winter 2018/2019</li>
                </ul>
                <br>
              <li>Mysore</li>
                <ul>
                  <li>Winter 2018/2019</li>
                </ul>
                <br>
              <li>Bangalore</li>
                <ul>
                  <li>Winter 2018/2019</li>
                </ul>
                <br>
              <li>Delhi</li>
                <ul>
                  <li>Winter 2018/2019</li>
                </ul>
            </ul>

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
