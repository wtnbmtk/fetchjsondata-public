<script lang="ts">
  import { page } from "$app/stores";
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

  let dialog: HTMLDialogElement;

  const openDialog = () => {
    dialog.showModal();
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  };

  const closeDialog = () => {
    dialog.close();
  };
</script>

<button
  on:click={openDialog}
  transition:fade
  class="open"
  aria-label="menu open"
>
  <span />
  <span />
  <span /></button
>

<dialog bind:this={dialog}>
  <div class="inner">
    <nav class="menu">
      <div>
        {#each pages as a}
          {#if a.path === $page.url.pathname}
            <a
              on:click={closeDialog}
              class="active"
              href={a.path}
              style={a.style}
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
            <a
              on:click={closeDialog}
              class="passive"
              href={a.path}
              style={a.style}
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
      </div>
    </nav>
    <form method="dialog">
      <button on:click={closeDialog} class="close" aria-label="menu close"
        ><span />
        <span /></button
      >
    </form>
  </div>
</dialog>

<style>
  button.open,
  button.close {
    position: fixed;
    z-index: 1;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  button.open {
    inset: auto 16px 16px auto;
    font-size: 0.8rem;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(2px);
    transition: all 0.5s ease;
  }
  button.open span {
    position: absolute;
    display: block;
    height: 2px;
    width: 30px;
    margin: auto;
    background: white;
    transition: all 0.5s ease;
  }
  button.open span:first-child {
    inset: 18px 0 auto;
  }
  button.open span:nth-child(2) {
    inset: 0;
  }
  button.open span:last-child {
    inset: auto 0 18px;
  }
  button.close {
    inset: 0;
    margin: auto;
    background: #000;
    animation: in 0.5s ease;
    border: solid 2px #333;
  }
  button.close span {
    position: absolute;
    display: block;
    height: 2px;
    width: 30px;
    background: #fff;
    transition: all 0.5s;
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
    height: 100%;
    width: 100%;
    max-width: 984px;
    border: none;
    background: none;
    pointer-events: none;
  }
  dialog[open] {
    animation: fade-in 0.7s ease-out;
    pointer-events: inherit;
  }
  dialog::backdrop {
    animation: fade-in 0.7s ease-out;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fade-out {
    from {
      display: block;
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes in {
    from {
      opacity: 0;
      transform: translateY(200%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @keyframes circle {
    from {
      opacity: 0;
      translate: none;
    }
    to {
      opacity: 1;
    }
  }
  .menu div a {
    position: absolute;
    inset: 0;
    margin: auto;
    --angle: calc(270deg + calc(290deg / 4 * var(--index)));
    --x: calc(cos(var(--angle)) * 100px);
    --y: calc(sin(var(--angle)) * 100px);
    translate: calc(var(--x) - 0%) calc(var(--y) - 0%);
    text-align: center;
    font-size: small;

    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: grid;
    place-content: center;
    cursor: pointer;
    animation: circle 1s ease-in;
  }
  svg {
    width: 1rem;
    height: 1rem;
    margin: auto;
  }
  .active {
    background: #fff;
    color: #000;
    border: solid 2px #333;
  }
  .passive {
    background: #000;
    color: white;
    border: solid 2px #333;
  }
  @media (hover: hover) {
    button.open:hover span {
      transform: scaleX(1.2);
      transition: all 0.5s ease;
    }
    button.close:hover span {
      rotate: 90deg;
      transition: all 0.3s ease;
    }
    .menu a:hover {
      background-color: #fff;
      color: #000;
    }
  }
</style>
