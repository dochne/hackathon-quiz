<script>
    import Button from './Button.svelte'
    import { push } from 'svelte-spa-router'
</script>

<style>
    div {
        display: block;
    }
</style>

<div>
    <Button label="Play with friends" action={() => push("/game")} />
    <Button label="Settings" action={() => push("/settings")} />
</div>
