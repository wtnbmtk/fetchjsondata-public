<script lang="ts">
  import { goto } from "$app/navigation";
  import Card from "$lib/components/Card.svelte";
  import SearchForm from "$lib/components/SearchForm.svelte";
  import { onMount } from "svelte";

  let query = "";

  function handleSearch(event: CustomEvent) {
    const value = event.detail.query;
    goto(`/search?q=${encodeURIComponent(value)}`);
  }

  interface User {
    id: string;
    name: string;
    age: number;
  }

  let users: User[] = []; // usersの型を指定
  let newId = "";
  let newName = "";
  let newAge = "";
  let deleteId = "";
  let addPassword = "";
  let deletePassword = "";

  onMount(async () => {
    const response = await fetch("/");
    if (response.ok) {
      const data = await response.json();
      users = data.users;
    }
  });

  async function addUser() {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Password": addPassword,
      }, // パスワードをヘッダーで送信
      body: JSON.stringify({
        id: newId,
        name: newName,
        age: Number.parseInt(newAge),
      }),
    });
    if (response.status === 409) {
      alert("このIDはすでに存在します");
    } else if (response.ok) {
      const data = await response.json();
      if (data.success) {
        // サーバーから最新のユーザーリストを取得
        const updatedResponse = await fetch("/");
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          users = updatedData.users;
        }
        // フォームをリセット
        newId = "";
        newName = "";
        newAge = "";
        addPassword = "";
      } else {
        alert("Failed to add user");
      }
    } else {
      // 認証失敗時の処理
      alert("パスワードが正しくありません。");
    }
  }

  async function deleteUser() {
    const response = await fetch("/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Password": deletePassword,
      }, // パスワードをヘッダーで送信
      body: JSON.stringify({ id: deleteId }),
    });
    if (response.status === 404) {
      alert("このIDは存在しません");
    } else if (response.ok) {
      const data = await response.json();
      if (data.success) {
        // サーバーから最新のユーザーリストを取得
        const updatedResponse = await fetch("/");
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          users = updatedData.users;
        }
        // フォームをリセット
        deleteId = "";
        deletePassword = "";
      } else {
        alert("Failed to delete user");
      }
    } else {
      // 認証失敗時の処理
      alert("パスワードが正しくありません。");
    }
  }
</script>

<div class="contain">
  <div class="wrap">
    <p class="phrase">
      Simple JSON Data Fetching. <br />The Breakneck<br />Searching Speed of
      Results.
    </p>
  </div>
</div>
<div class="contain">
  <div class="h2">
    <h2>Data Lists</h2>
    <span />
  </div>
  <div class="inner">
    <SearchForm {query} on:search={handleSearch} />
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
    <div class="form">
      <form on:submit|preventDefault={addUser}>
        <fieldset>
          <legend>Add User</legend>
          <label>
            ID:
            <input type="text" bind:value={newId} required size="18" />
          </label>
          <label>
            Name:
            <input type="text" bind:value={newName} required size="18" />
          </label>
          <label>
            Age:
            <input type="number" bind:value={newAge} required size="18" />
          </label>
          <label>
            Password:
            <input
              type="password"
              placeholder="password"
              bind:value={addPassword}
              required
              size="18"
            />
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </form>

      <form on:submit|preventDefault={deleteUser}>
        <fieldset>
          <legend>Delete User</legend>
          <label>
            ID:
            <input type="text" bind:value={deleteId} required size="18" />
          </label>
          <label>
            Password:
            <input
              type="password"
              placeholder="password"
              bind:value={deletePassword}
              required
              size="18"
            />
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  </div>
</div>

<style>
  .form {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(192px, auto));
  }
  input[type="text"] {
    width: 192px;
  }
  input[type="number"] {
    width: 192px;
  }
  input[type="password"] {
    width: 192px;
  }
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
  .form {
    max-width: 400px;
    margin: auto;
  }
  h3 {
    margin: 32px 0 0;
  }
  button {
    background: chartreuse;
    border-radius: 8px;
    padding: 0 8px;
    margin: 16px 0;
  }
  .cover {
    position: relative;
    margin: 0 auto 8px;
    padding: 0;
    max-width: revert;
    height: 400px;
  }
  .wrap {
    min-height: 150px;
    display: grid;
    padding: 4rem 0;
  }
  .phrase {
    font: 1em "AstroWeb-20", serif;
    font-weight: unset;
    margin: auto;
    font-size: clamp(2rem, 4vw, 4rem);
    text-align: revert;
  }
  .phrase span {
    color: #d0021b;
    font-weight: bold;
  }
  .inner {
    margin: 1rem auto 0;
  }
</style>
