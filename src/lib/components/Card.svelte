<script lang="ts">
  export let users;
</script>

{#if users.length > 0}
  <dl class="users">
    {#each users as users}
      <div class="card">
        <dt>ID</dt>
        <dd>{users.id}</dd>
        <dt>Name</dt>
        <dd>{users.name}</dd>
        <dt>Age</dt>
        <dd>{users.age}</dd>
      </div>
    {/each}
  </dl>
{/if}

<style>
  .card {
    max-width: 400px;
    display: grid;
    grid-template-columns: 80px auto;
    border-top: solid 2px #ccc;
    border-right: solid 2px #ccc;
    border-left: solid 2px #ccc;
    color: #000;
    margin: 16px auto;
  }
</style>
