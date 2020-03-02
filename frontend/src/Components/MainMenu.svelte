<script>
    import Button from './Button.svelte'
    import { push } from 'svelte-spa-router'
</script>

<style>
    .menu {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
</style>


<div class="menu">
    <div class="row v-center">
        <div class="container">
            <Button label="Play with friends" action={() => push("/game")} />
            <Button label="Settings" action={() => push("/settings")} />
        </div>
    </div>
</div>