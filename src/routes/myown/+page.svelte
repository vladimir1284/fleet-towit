<!-- src/routes/+page.svelte -->

<!-- 1. -->
<script lang="ts">
    import type { PageData } from './$types'
  
    export let data: PageData
  </script>
  
  <div>
    <h1>My Blog</h1>
    <main>
      <div>
        <!-- 2. -->
        {data.company.name} {data.user}
      </div>
    </main>
  </div>
  