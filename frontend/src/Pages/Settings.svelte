<style>
    .settings {
        margin-bottom: 20px;
    }
</style>

<script>
    import Button from '../Components/Button.svelte'
    import { push } from 'svelte-spa-router'
    import { user } from '../Stores/User.js'

    let username;
    let colour;
    let image;

    // Update
    function saveUser() {

        // Don't allow continue without setting a name
        if (username.length <= 0) {
            return;
        }

        // Save user
        user.update((user) => {
            user.name = username;
            user.colour = colour;
            user.image = image;
            user.configured = true;
            return user;
        });

        // Back to menu
        push('/');
    }

    // Subscribe to user event changes
    user.subscribe(value => {
        username = value.name;
        colour = value.colour;
        image = value.image;
    });

</script>

<div class="row v-center">
    <div class="container">

        <div class="settings">
            <h1>Settings</h1>

            <label for="name">Your nickname</label>
            <input type="text" id="name" bind:value={ username } />

            <label for="name">Colour</label>
            <input type="text" id="name" bind:value={ colour } />

            <label for="name">Image</label>
            <input type="text" id="name" bind:value={ image } />
        </div>

        <Button label="Save" action="{saveUser}" />

    </div>
</div>


