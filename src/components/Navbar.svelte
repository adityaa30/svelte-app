<script>
  import { Link } from "svelte-routing";
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link to="/"><span class="navbar-brand">Svelte App</span></Link>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation">
    <span class="navbar-toggler-icon" />
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link to="/">
          <span class="nav-link">Home</span>
        </Link>
      </li>
      <li class="nav-item active">
        <Link to="/about">
          <span class="nav-link">About</span>
        </Link>
      </li>
    </ul>
  </div>
</nav>
