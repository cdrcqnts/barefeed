<template>
    <v-snackbar
            v-if="$store.state.err"
            v-model="snackbar"
            color="error"
            :timeout=5000
            :bottom=true
    >
        {{ $store.state.err }}
        <v-btn
                dark
                flat
                @click="snackbar = false"
        >
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "ErrMsg",
        data:() =>({
        snackbar: true
    })
    }
</script>