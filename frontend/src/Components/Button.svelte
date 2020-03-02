<style>
    button {

    }
</style>

<script>
	export let label;
	export let action;
</script>

<button class="menu-button" on:click={action}>{ label }</button>
