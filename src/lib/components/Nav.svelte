<script lang="ts">
  import { page } from "$app/stores";

  const pages = [
    { name: "Nav-1", path: "/nav01" },
    { name: "Nav-2", path: "/nav02" },
    { name: "Nav-3", path: "/nav03" },
    { name: "Nav-4", path: "/nav04" },
  ];
</script>

<nav>
  {#each pages as a}
    {#if a.path === $page.url.pathname}
      <a class="active" href={a.path}>{a.name}</a>
    {:else}
      <a class="passive" href={a.path}>{a.name}</a>
    {/if}
  {/each}
</nav>

<style>
  nav {
    display: none;
    position: absolute;
    inset: 0 16px 0 auto;
    text-transform: uppercase;
  }
  a:hover::after {
    position: relative;
    content: "";
    display: block;
    border-bottom: solid 2px;
    top: -6px;
  }
  /* .active::after {
		position: relative;
		content: '';
		display: block;
		border-bottom: solid 2px;
		top: -6px;
	} */
  .mail {
    width: 30px;
    position: relative;
  }
  .mail svg {
    position: absolute;
    inset: 0;
    margin: auto;
  }

  @media (width >= 600px) {
    nav {
      display: grid;
      grid-auto-flow: column;
      gap: 1rem;
      width: fit-content;
    }
  }
</style>
