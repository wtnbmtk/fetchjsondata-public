<script lang="ts">
  import { page } from "$app/stores";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  const pages = [
    {
      name: "HOME",
      path: "/",
      style: "--index: 0;",
      d: "M8.543 2.232a.75.75 0 0 0-1.085 0l-5.25 5.5A.75.75 0 0 0 2.75 9H4v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h1.25a.75.75 0 0 0 .543-1.268l-5.25-5.5Z",
    },
    {
      name: "Nav-1",
      path: "/nav01",
      style: "--index: 1;",
      d: "M4.5 2A2.5 2.5 0 0 0 2 4.5v2.879a2.5 2.5 0 0 0 .732 1.767l4.5 4.5a2.5 2.5 0 0 0 3.536 0l2.878-2.878a2.5 2.5 0 0 0 0-3.536l-4.5-4.5A2.5 2.5 0 0 0 7.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
    },
    {
      name: "Nav-2",
      path: "/nav02",
      style: "--index: 2;",
      d: "M4.5 2A2.5 2.5 0 0 0 2 4.5v2.879a2.5 2.5 0 0 0 .732 1.767l4.5 4.5a2.5 2.5 0 0 0 3.536 0l2.878-2.878a2.5 2.5 0 0 0 0-3.536l-4.5-4.5A2.5 2.5 0 0 0 7.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
    },
    {
      name: "Nav-3",
      path: "/nav03",
      style: "--index: 3;",
      d: "M4.5 2A2.5 2.5 0 0 0 2 4.5v2.879a2.5 2.5 0 0 0 .732 1.767l4.5 4.5a2.5 2.5 0 0 0 3.536 0l2.878-2.878a2.5 2.5 0 0 0 0-3.536l-4.5-4.5A2.5 2.5 0 0 0 7.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
    },
    {
      name: "Nav-4",
      path: "/nav04",
      style: "--index: 4;",
      d: "M4.5 2A2.5 2.5 0 0 0 2 4.5v2.879a2.5 2.5 0 0 0 .732 1.767l4.5 4.5a2.5 2.5 0 0 0 3.536 0l2.878-2.878a2.5 2.5 0 0 0 0-3.536l-4.5-4.5A2.5 2.5 0 0 0 7.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
    },
  ];

  export let dialog: HTMLDialogElement;
  const dispatch = createEventDispatcher();
  function clickClose() {
    dispatch("closeDialog");
  }
</script>

<dialog bind:this={dialog}>
  <div class="inner">
    <h2>MENU</h2>
    <nav>
      {#each pages as a}
        {#if a.path === $page.url.pathname}
          <a on:click={clickClose} class="active" href={a.path} style={a.style}
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="w-4 h-4"
            >
              <path fill-rule="evenodd" d={a.d} /></svg
            >{a.name}</a
          >
        {:else}
          <a on:click={clickClose} class="passive" href={a.path} style={a.style}
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="w-4 h-4"
            >
              <path fill-rule="evenodd" d={a.d} /></svg
            >{a.name}</a
          >
        {/if}
      {/each}
    </nav>
    <form method="dialog">
      <button on:click={clickClose} class="close" aria-label="menu close"
        ><span />
        <span /></button
      >
    </form>
  </div>
</dialog>

<style>
  button.close {
    position: relative;
    margin: auto;
    font-size: small;
    color: white;
    height: 40px;
    width: 40px;
  }
  button.close span {
    position: absolute;
    display: block;
    height: 2px;
    width: 30px;
    background: #fff;
  }
  button.close span:first-child {
    inset: 0;
    margin: auto;
    transform: rotate(45deg);
  }
  button.close span:last-child {
    inset: 0;
    margin: auto;
    transform: rotate(135deg);
  }
  dialog {
    position: fixed;
    inset: 0;
    margin: auto;
    border: none;
    animation: slide-down 0.7s ease-out;
    pointer-events: none;
    z-index: 1;
  }
  dialog[open] {
    animation: slide-up 0.7s ease-out;
    pointer-events: inherit;
  }
  dialog::backdrop {
    animation: fade-in 0.7s ease-out;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
  }
  @keyframes slide-up {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-down {
    from {
      display: block;
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .inner {
    padding: 1rem 2rem;
    background: black;
  }
  h2 {
    width: 100%;
    text-align: center;
    color: white;
  }
  nav {
    margin: 1rem 0;
    display: grid;
    gap: 1rem;
  }
  a {
    position: relative;
    z-index: 0;
    display: grid;
    grid-auto-flow: column;
    place-content: center;
    text-decoration: none;
    cursor: pointer;
    font-size: 1rem;
    place-self: baseline;
    width: 160px;
    transition: all 1s ease-out;
    color: white;
  }
  a:after {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(153, 153, 153, 1) 20%,
      rgba(255, 255, 255, 1) 40%,
      rgba(255, 255, 255, 1) 60%,
      rgba(153, 153, 153, 1) 80%,
      rgba(0, 0, 0, 1) 100%
    );
    opacity: 0;
    transition: all 1s ease-out;
  }
  a:hover {
    color: #000;
  }
  a:hover:after {
    opacity: 1;
  }
  .active {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(153, 153, 153, 1) 20%,
      rgba(255, 255, 255, 1) 40%,
      rgba(255, 255, 255, 1) 60%,
      rgba(153, 153, 153, 1) 80%,
      rgba(0, 0, 0, 1) 100%
    );
    color: #000;
  }
  .passive {
  }
  .active svg,
  .passive svg {
    width: 1rem;
    height: 1rem;
    margin: auto 8px auto 0;
  }
  @media (width >= 600px) {
    dialog {
      display: none;
    }
  }
</style>
