<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import SearchForm from "$lib/components/SearchForm.svelte";
  import type { JSONBin } from "$lib/server/types";
  import { onMount } from "svelte";
  import { derived } from "svelte/store";

  let filteredCard: JSONBin[] = [];
  let query = "";

  const searchQuery = derived(
    page,
    ($page) => $page.url.searchParams.get("q") || ""
  );

  interface User {
    id: string;
    name: string;
    age: number;
  }

  let users: User[] = []; // usersの型を指定

  // データの取得
  onMount(async () => {
    const response = await fetch("/");
    if (response.ok) {
      const data = await response.json();
      users = data.users;
    }
  });

  // クエリ変更時にフィルタリング
  $: {
    searchQuery.subscribe((q) => {
      query = q;
      const lowerCaseQuery = q.toLowerCase();
      filteredCard = users.filter((user) => {
        const lowerCaseName = user.name.toLowerCase();
        const lowerCaseId = user.id.toLowerCase();
        return (
          lowerCaseName.includes(lowerCaseQuery) ||
          lowerCaseId.includes(lowerCaseQuery)
        );
      });
    });
  }

  // フォーム送信時にクエリを更新してフィルタリングを行う
  function handleSearch(event: CustomEvent) {
    const value = event.detail.query;
    goto(`/search?q=${encodeURIComponent(value)}`);
  }
</script>

<div class="contain">
  <h1>
    {#if query}
      {#if filteredCard.length > 0}
        「{query}」に該当するデータが見つかりました。
      {:else}
        「{query}」に該当するデータはありません。
      {/if}
    {:else}
      検索してください。
    {/if}
  </h1>
  <div class="inner">
    <SearchForm {query} on:search={handleSearch} />

    {#if filteredCard.length > 0}
      <dl class="users">
        {#each filteredCard as users}
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
  </div>
</div>

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
