<style>
    a {
        background-color: #333;
        width: 100%;
        display: block;
        padding: 10px;
        color: #fff;
        margin: 10px 0;
    }
</style>

<script>
	export let label;
	export let action;
</script>

<a on:click={action}>{ label }</a>
