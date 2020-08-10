<template>
    <main>
        TEST
    </main>
</template>

<script>
export default {
    name: 'MemoryGame',
    mounted() {
        if (this.$attrs.home) this.animationFromHome();
        else this.animationFromMenu();
    },
    methods: {
        animationFromHome() { // Animation will be played only if you came to this page by using homepage buttons
            const main = document.getElementsByTagName('main');
            const tl = this.$gsap.timeline();

            tl.fromTo(main, { translateY: '-50%' }, { translateY: '0%', duration: 1 });
        },
        animationFromMenu() { // Animation will be played in other cases
            const main = document.getElementsByTagName('main');
            const tl = this.$gsap.timeline();

            tl.fromTo(main, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 });
        },
    },
};
</script>

<style lang="scss" scoped>
    main {
        color: white;
        font-size: 100px;
    }
</style>
