<script>
  import { onMount } from "svelte";
  import { getAllQuotes, deleteQuote } from "../server/index.js";

  import QuoteForm from "./QuoteForm.svelte";

  let quotes = [];
  let editingQuote = {
    author: "",
    text: "",
    id: null,
    tags: []
  };

  onMount(async () => {
    quotes = await getAllQuotes();
  });

  function _editQuote(quote) {
    editingQuote = quote;

    // Scroll to top
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  async function _deleteQuote(id) {
    if (confirm("Sure to delete this quote?")) {
      const response = await deleteQuote(id);
      console.log(response);

      quotes = await getAllQuotes();
    }
  }

  function addQuote({ detail: quote }) {
    // Assing new value to re-render
    quotes = [quote, ...quotes];
  }

  function updateQuote({ detail: quote }) {
    let idx = quotes.findIndex(val => {
      return val.id === quote.id;
    });

    quotes[idx] = quote;
  }
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
    word-break: keep-all;
  }

  .quotes-container > .quote-tag {
    border-color: #17202a90;
    border-radius: 4px;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 4px;
    margin: 4px;
  }
</style>

<div class="row">
  <QuoteForm on:quoteCreated={addQuote} on:quoteUpdated={updateQuote} {editingQuote} />
</div>

<div class="row">
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
            <div
              class="btn btn-outline-primary"
              on:click={() => _editQuote(quote)}>
              Edit
            </div>
            <div
              class="btn btn-outline-danger"
              on:click={() => _deleteQuote(quote.id)}>
              Delete
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
