<script>
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>404 ページが見つかりませんでした</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="contain">
  <h1>{$page.error?.message}</h1>
  <div class="inner">
    <a href="/">トップページにもどる</a>
  </div>
</div>
