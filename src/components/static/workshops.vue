<template>
  <main role="main">
    <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">Workshops</h1>
          <p class="lead text-muted">The Humanistic Co-Design Initiative runs workshops throughout cities in India. <br> Please reach out to us for inquiries about participating or helping to run future workshops.</p>
          <p>
            <a class="btn btn-outline-secondary my-2"><router-link :to="{ name: 'connect'}">Reach Out!</router-link></a>
          </p>
        </div>
      </section>

      <main role="main" class="container">
        <div class="row">
          <div class="col-md-12 blog-main">
            <h3 class="pb-3 mb-4 font-italic border-bottom">
              Upcoming Workshops
            </h3>

          <div class="blog-post">

            <ul>
              <li>Summer 2018</li>
              <ul>
                <li>Chennai</li>
                  <ul>
                    <li>August 10-12th 2018 in Collaboration with MyCaptain | The Climber</li>
                  </ul>
              </ul>
              <li>Winter 2018 - Dates to be announced soon</li>
              <ul>
                <li>Kolkata</li>
                <li>Mysore</li>
                <li>Bangalore</li>
                <li>Delhi</li>
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
