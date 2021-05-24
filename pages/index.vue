<template>
  <div class="index">
    <div class="hero">
      <div class="container hero__inner">
        <div class="hero__text">
          <h1 class="hero__title">Hi, I'm Ramona</h1>
          <h2 class="hero__sub-title">A frontend-developer<br> who ❤️ test automation and JavaScript</h2>
          <Button>Visit my projects</Button>
          <Button variant="secondary">Message me</Button>
        </div>

        <img class="hero__image" src="/moe.jpg">
      </div>
    </div>
    <div class="featured-posts">
      <div class="container">
        <article class="post">
          <h3 class="post__title">Cypress request feature</h3>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          <Button variant="secondary">Read more...</Button>
        </article>
        <article class="post">
          <h3 class="post__title">How to survive conferences</h3>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          <Button variant="secondary">Read more...</Button>
        </article>
        <article class="post">
          <h3 class="post__title">Problem, officer?</h3>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
          <Button variant="secondary">Read more...</Button>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.hero {
  min-height: 300px;
  padding: 100px 0;
  border-bottom: 1px solid var(--color-border);
}

.hero__title {
  font-size: 60px;
  font-weight: normal;
  margin-bottom: 20px;
}

.hero__sub-title {
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 30px;
  color: var(--color-primary);
}

.hero__inner {
  display: flex;
}

.hero__image {
  margin-left: auto;
  width: 350px;
  height: 350px;
  border-radius: 50%;
}

.featured-posts {
  padding: 40px 0;
}

.post__title {
  font-size: 22px;
  font-weight: normal;
  margin-bottom: 20px;
  color: var(--color-primary);
}

.featured-posts .container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px;
}

.featured-posts p {
  margin-bottom: 30px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
