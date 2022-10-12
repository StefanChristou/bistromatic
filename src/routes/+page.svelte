
<svelte:head>
  <title>stefanchristou.com</title>
  <meta name="description" content="Stefan Christou's personal website" />
</svelte:head>

<section class="title-area">
  <h1>
    Stefan Christou's website
  </h1>
</section>
<section>
  <figure class="pic">
    <img src="images/nature.jpg" alt="Not a picture of Stefan Christou. A pile of logs" />
    <figcaption>A logpile house. © Stefan Christou 2021</figcaption>
  </figure>
</section>

<style>
  .title-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }

  h1 {
    width: 100%;
    text-align: left;
  }

  .pic {
    width: 100%;
    max-width: 500px;
    display: block;
    padding: 2rem;
  }

  img {
    width: 100%;
  }

  figcaption {
    font-size: 0.7rem;
  }
</style>