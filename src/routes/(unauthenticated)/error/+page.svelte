<script>
    import { onMount } from 'svelte';
  
    /**
	 * @type {any[]}
	 */
    let queryParams = [];
  
    onMount(() => {
      const searchParams = new URLSearchParams(window.location.search);
      queryParams = Array.from(searchParams.entries()).map(([key, value]) => {
        return { key, value };
      });
    });
  </script>
  
  <ul>
    {#each queryParams as { key, value }}
      <li><strong>{key}:</strong> {value}</li>
    {/each}
  </ul>