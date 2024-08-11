<script lang="ts">
  import "../app.css";
  import icon from "$lib/assets/icon.svg";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import Menu from "$lib/components/Menu.svelte";
</script>

<svelte:head>
  <link rel="icon" href={icon} />
</svelte:head>

<Header />

<main>
  <slot />
  <Menu />
</main>

<Footer />
