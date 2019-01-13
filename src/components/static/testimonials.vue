<template>
  <main role="main">
    <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">Testimonials</h1>
        </div>
      </section>

      <main role="main" class="container">
        <masonry
          :cols="{default: 3, 991: 2, 767: 1}"
          :gutter="{default: '30px', 767: '15px'}"
          >
          <div class="card flex-md-row mb-4 shadow-sm h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
              <p class="card-text mb-auto">The most exciting thing about this workshop is getting to be with a group of other students who are extremely creative and passionate about their interests.
                At one point, we did an improv exercise in which we generated project ideas, and the ideas that people came up with were just so fascinating.
                People are thinking so big here; they’re really trying to solve the world’s problems. <br> <br> ― Ronit, MIT Student</p>
            </div>
          </div>

          <div class="card flex-md-row mb-4 shadow-sm h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
              <p class="card-text mb-auto">The collaboration in this workshop was good.
                Taking someone else’s idea that I thought I understood, and working together to figure out the possibilities associated with that idea was very exciting.
                The challenges were frustrating, but the discoveries were very rewarding.<br> <br> ― Chris, Professional</p>
            </div>
          </div>

          <div class="card flex-md-row mb-4 shadow-sm h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
              <p class="card-text mb-auto">I found the workshop fun. I really liked it.
                The hard part was just identifying your project ideas and figuring out what was doable—and what was not—in the allotted timeframe.
                <br> <br> ― Roseanne, Wellesley Student</p>
            </div>
          </div>

          <div class="card flex-md-row mb-4 shadow-sm h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
              <p class="card-text mb-auto">The workshop is very interactive. I was nervous, at first, about working in teams every day.
                But it went over really well and I enjoyed working with my teammates. It’s great that people from outside MIT participate because you get to benefit from their ideas.
                The more diversity, the better! <br> <br> ― Tyler, MIT Student </p>
            </div>
          </div>

          <div class="card flex-md-row mb-4 shadow-sm h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
              <p class="card-text mb-auto">Initially, I found the teamwork in this workshop challenging because all of us seemed to want to implement our own project ideas.
                But then I realized that it was be better to listen to someone else’s idea and try to work on it.
                When we ran into challenges, we’d introduce other ideas and try to mesh them with the original vision for the project.
                I realized teamwork was all about combining ideas. <br> <br> ― Hairuo, Stony Brook University Student </p>
            </div>
          </div>
        </masonry>
    </main>

    <hr class="featurette-divider">

  <footer class="container">
    <p class="float-right"><a href="#">Back to top</a></p>
    <p>© 2018 Humanistic Co-Design Initiative · <a><router-link :to="{ name: 'privacy'}">Privacy</router-link></a></p>
  </footer>
    </main>
</template
