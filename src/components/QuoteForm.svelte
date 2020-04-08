<script>
  import { addQuote, updateQuote } from "../server/index";
  import { QUOTE_CREATED, QUOTE_UPDATED } from "../utils/events";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  // Declare a prop variable
  export let editingQuote = {
    author: "",
    text: "",
    tags: [],
    id: null
  };

  // Declare reactive (runs whenever component updates or depending values (editingQuote) have changed
  $: author = editingQuote.author;
  $: text = editingQuote.text;
  $: tags = editingQuote.tags;

  let loading = false;

  async function onSubmit(event) {
    event.preventDefault();

    if (author.trim() === "" || text.trim() === "") {
      return;
    }

    loading = true;
    if (editingQuote.id) {
      await updateQuote(editingQuote);
      dispatch(QUOTE_UPDATED, editingQuote);
    } else {
      // Creating a new post
      const quote = await addQuote({
        author,
        text,
        tags: []
      });
      dispatch(QUOTE_CREATED, quote);
    }

    // Reset form
    author = "";
    text = "";

    loading = false;
  }
</script>

<style>
  .card {
    width: 100%;
    margin: 12px;
    padding: 20px;
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }
</style>

{#if !loading}
  <div class="card">
    <div class="card-body">
      <h1 class="card-title">{editingQuote.id ? 'Edit' : 'Add'} Quote</h1>
      <form on:submit={onSubmit}>
        <div class="form-group">
          <label for="author">Author Name</label>
          <input
            class="form-control"
            id="author"
            placeholder="Author Name"
            bind:value={editingQuote.author} />
        </div>
        <div class="form-group">
          <label for="author">Quote</label>
          <textarea
            type="text"
            class="form-control"
            id="text"
            placeholder="Quote"
            bind:value={editingQuote.text}
            rows="5" />
        </div>
        <button type="submit" class="btn btn-primary">
          {editingQuote.id ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  </div>
{:else}
  <div class="spinner-border text-dark" role="status">
    <span class="sr-only">Loading...</span>
  </div>
{/if}
