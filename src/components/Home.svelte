<script>
  import { onMount } from "svelte";
  import { getAllQuotes } from "../server/index.js";

  let quotes = [];

  onMount(async () => {
    quotes = await getAllQuotes();
  });

  const editQuote = quote => {
    console.log(`Editing ${quote}`);
  };

  const deleteQuote = quote => {
    console.log(`Deleting ${quote.id}`);
  };
</script>

<style>
  div .card-container {
    display: grid;
    grid-template-columns: auto auto;
  }
  div .card-container > .card {
    margin: 12px;
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }

  .quotes-container {
    margin: 10px 0;
  }

  .quotes-container > .quote-tag {
    border-color: #17202a90;
    border-style: solid;
    border-width: 1px;
    border-radius: 4px;
    padding: 4px;
    margin: 4px;
  }
</style>

<div class="row">
</div>

<div class="row">
  <div>
    {#if quotes.length === 0}
      <h3>Loding quotes</h3>
    {:else}
      <div class="card-container">
        {#each quotes as quote}
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{quote.author}</h5>
              <div class="quotes-container">
                {#each quote.tags as tag}
                  <span class="quote-tag">{tag}</span>
                {/each}
              </div>
              <p class="card-text">{quote.text}</p>
              <div class="card-action">
                <a
                  href="#"
                  class="btn btn-outline-primary"
                  on:click={() => editQuote(quote)}>
                  Edit
                </a>
                <a
                  href="#"
                  class="btn btn-outline-danger"
                  on:click={() => deleteQuote(quote)}>
                  Delete
                </a>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
