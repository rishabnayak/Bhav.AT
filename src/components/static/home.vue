<template>
  <main role="main">
    <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">Build at Bhav.AT</h1>
          <p class="lead text-muted">We run assistive technology workshops in cities throughout India. We build and sell assistive technology devices. We offer mentoring, product development, production and certification services for assistive technologies.</p>
          <p>
            <a class="btn btn-outline-secondary my-2"><router-link :to="{ name: 'connect'}">Reach Out!</router-link></a>
          </p>
        </div>
      </section>
        <div class="album py-5 bg-light">
              <div class="container">
                <div class="row">
                  <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                      <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="@/assets/card1.jpg" data-holder-rendered="true">
                      <div class="card-body">
                        <h4>Prototyping</h4>
                        <p class="card-text">Fast prototyping with affordable technologies</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                      <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" src="@/assets/card2.jpg" data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">
                      <div class="card-body">
                        <h4>Workshops</h4>
                        <p class="card-text">We run assistive technology workshops in cities across India.</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                      <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" src="@/assets/card3.jpg" data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">
                      <div class="card-body">
                        <h4>Products</h4>
                        <p class="card-text">We create products through our workshops and fund long term development of assistive technology products.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr class="featurette-divider">

          <footer class="container">
            <p class="float-right"><a href="#">Back to top</a></p>
            <p>© 2018 Bhav.AT · <a><router-link :to="{ name: 'privacy'}">Privacy</router-link></a></p>
          </footer>
    </main>
</template
