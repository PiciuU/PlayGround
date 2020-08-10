<template>
    <nav aria-expanded="false">
        <div class="background"></div>
        <div class="hamburger-outer">
            <div @click="toggle" class="hamburger">
                <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                </span>
            </div>
        </div>
        <div class="navigation">
            <div class="navigation-title"><router-link to="/">Play<span>Ground</span></router-link></div>
            <div class="navigation-option"><router-link to="/">Memory Game</router-link></div>
            <div class="navigation-option"><router-link to="/">Tic Tac Toe</router-link></div>
            <div class="navigation-option"><router-link to="/">Rock Paper Scrissors</router-link></div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Hamburger',
    methods: {
        toggle() {
            this.$el.classList.toggle('nav-active');
            this.$el.setAttribute('aria-expanded', this.$el.classList.contains('nav-active'));
        },
    },
};
</script>

<style lang="scss" scoped>

    .navigation {
        width: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        padding: 20px;
        visibility: hidden;
        overflow-x: hidden;
        box-sizing: border-box;
        z-index: 100;
        font-family: Pixel;
        -webkit-tap-highlight-color: transparent;
        transform:translateY(-2000px);
        transition: transform .5s ease-in-out, visibility 1s 0s;
    }

    .navigation-title {
        position: relative;
        padding-left: 5px;
        box-sizing: border-box;
        letter-spacing: 5px;
        font-size: 6vw;
        text-align:center;

        span {
            color: #32892F;
            transition: color .25s ease-in-out;
        }

        a {
            text-decoration: none;
            color: white;
            transition: color .25s ease-in-out;
        }

        &:hover a { color: #32892F; }
        &:hover span { color: white; }
    }

    .navigation-option {
        margin-top: 50px;
        padding-left: 5px;
        box-sizing: border-box;
        font-size: 3vw;
        text-align:center;
        letter-spacing: 5px;
        transition: transform .25s ease-in-out;

        &:hover {
            transform: scale(1.2);
        }

        a {
            padding: 1px 0px 1px 0px;
            text-decoration: none;
            color: white;
            overflow: hidden;
            background: linear-gradient(#32892F, #32892F 50%, white 50%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% 200%;
            background-position: 100% 100%;
            transition: background-position .25s ease-in-out;

            &:hover {
                background-position: 100% 200%;
            }
        }
    }

    .background {
        width: 1px;
        height: 1px;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 100;
        background: rgb(29, 35, 41);
        transition: all .5s ease-in-out;
        border-bottom-left-radius: 50%;
    }

    .hamburger-outer {
        width: 200px;
        height: 200px;
        position: fixed;
        top: -110px;
        right: -110px;
        border-radius: 50%;
        background: rgb(29, 35, 41);
        transition: all .5s ease-in-out;

        z-index: 999;

        &:after {
            content: '';
            width: 200px;
            height: 200px;
            position: absolute;
            top: -5px;
            right: -5px;
            border: 3px solid #32892F;
            border-radius: 50%;
            z-index: -1;
            transition: opacity .25s ease-in-out;
            box-shadow: 2px 5px 20px #000;
        }
    }

    .hamburger {
        position: fixed;
        padding: 15px;
        display: inline-block;
        cursor: pointer;
        background-color: transparent;
        border: 0;
        outline: 0;
        margin: 0;
        right: 0;
        top: 0;
        -webkit-tap-highlight-color: transparent;
    }

    .hamburger-box {
        width: 35px;
        height: 24px;
        display: inline-block;
        position: relative;
    }

    @mixin hamburger-line {
        width: 100%;
        height: 3px;
        background-color: white;
        position: absolute;
    }

    .hamburger-inner {
        @include hamburger-line;
        left: 0;
        top: 50%;
        transform:translateY(-50%);
        transition: background-color .1s  ease-in-out;

        &:before, &:after {
            @include hamburger-line;
            content: '';
            left: 0;
            transition: transform .2s ease-in-out;
        }

        &:before { top: -10px; }
        &:after { top: 10px; }
    }

    .nav-active .hamburger-outer {

        background: rgba(29, 35, 41, 0);

        &:after {
            opacity: 0;
        }
    }

    .nav-active .hamburger-inner {
        background-color: transparent;

        &:before {
            transform: translateY(10px) rotate(45deg);
        }
        &:after {
            transform: translateY(-10px) rotate(-45deg);
        }
    }

    .nav-active .background {
        width: 150%;
        height: 150%;
    }

    .nav-active .navigation {
        transition: transform .75s ease-in-out, visibility 0s 0s;
        visibility: visible;
        transform:translateY(0px);
    }

    @media (max-width:767px) {
        .hamburger-outer {
            top: -130px;
            right: -130px;

            .hamburger {
                padding: 8px;

                .hamburger-box {
                    width: 28px;
                }
            }
        }

        .navigation-title {
            font-size: 8vw;
        }

        .navigation-option {
            font-size: 6vw;

            &:last-child {
                line-height: 30px;
            }
        }
    }
</style>
