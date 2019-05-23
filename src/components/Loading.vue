<template>
    <v-app>
        <v-content>
            <ErrMsg></ErrMsg>
            <v-container fill-height fluid>
                <v-layout align-center justify-center>
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: "Loading"
    }
</script>