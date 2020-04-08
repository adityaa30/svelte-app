<script>
  import { Router, Link, Route } from "svelte-routing";
  import Navbar from "./components/Navbar.svelte";
  import About from "./components/About.svelte";
  import Home from "./components/Home.svelte";
</script>

<Router>
  <Navbar />

  <div class="container">
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
  </div>
</Router>
