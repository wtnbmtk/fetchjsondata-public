<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
  import Nav from "$lib/components/Nav.svelte";
</script>

<footer>
  <div class="nav">
    <Nav />
  </div>
  <a class="logo" href="/"><Logo /></a>
  <small class="copyright">© 2024 Motoki Watanabe</small>
</footer>

<style>
  /* FOOTER*/
  footer {
    padding: 0 8px;
  }
  .nav {
    position: relative;
    max-width: 800px;
    height: 40px;
    line-height: 40px;
    margin: auto;
  }
  .nav :global(nav) {
    inset: 0;
    margin: auto;
  }
  .logo {
    display: block;
    width: fit-content;
    margin: 16px auto 8px;
  }
  .copyright {
    display: block;
    text-align: center;
    margin-bottom: 8px;
  }
  @media (width >= 600px) {
    li {
      display: inline-block;
    }
    li:first-child {
      margin-left: 0;
    }
    li:last-child {
      margin-right: 0;
    }
  }
</style>
