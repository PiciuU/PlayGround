<template>
    <div id="app">
        <Hamburger></Hamburger>
        <Background></Background>
        <router-view/>
    </div>
</template>

<style lang="scss">

    html, body, #app {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }

    main {
        width: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    @font-face {
        font-family: "Pixel";
        src: url('./assets/fonts/Pixel.ttf');
    }

    @font-face {
        font-family: "Undo";
        src: url('./assets/fonts/Undo.ttf');
    }

    @font-face {
        font-family: "Montserrat";
        src: url('./assets/fonts/Montserrat.ttf');
    }
</style>
