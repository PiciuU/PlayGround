<template>
    <main>
        <div ref="elTitle" class="title">
            Play<span>Ground</span>
        </div>

        <div ref="elSubtitle" class="subtitle">
            Pick one from available games.
        </div>

        <div ref="elGames" class="games-container">
            <div class="game-card">
                <div class="card-inner">
                    <div class="icon">
                        <MemoryGame class="svg"/>
                    </div>
                    <div class="name">
                        Memory Game
                    </div>
                </div>
            </div>

            <div class="game-card">
                <div class="card-inner">
                    <div class="icon">
                        <TicTacToe class="svg"/>
                    </div>
                    <div class="name">
                        Tic Tac Toe
                    </div>
                </div>
            </div>

            <div class="game-card" @click="openGame('Rock Paper Scrissors')">
                <div class="card-inner">
                    <div class="icon">
                        <RockPaperScrissors class="svg"/>
                    </div>
                    <div class="name small">
                        Rock Paper Scrissors
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import MemoryGame from '@/assets/icons/memory-game.svg';
import TicTacToe from '@/assets/icons/tic-tac-toe.svg';
import RockPaperScrissors from '@/assets/icons/rock-paper-scrissors.svg';

export default {
    name: 'Home',
    components: {
        MemoryGame,
        TicTacToe,
        RockPaperScrissors,
    },
    mounted() {
        this.animate();
    },
    methods: {
        animate() {
            const tl = this.$gsap.timeline();
            const title = this.$refs.elTitle;
            const subtitle = this.$refs.elSubtitle;
            const gamesContainer = this.$refs.elGames;
            const games = gamesContainer.querySelectorAll('.game-card');

            tl.set([gamesContainer, ...games, title, subtitle], { autoAlpha: 0 });

            tl.fromTo(title, { scale: 0 }, { autoAlpha: 1, scale: 1, ease: 'back', duration: 1 })
                .to(title.children, { duration: 0.25, color: '#32892F', ease: 'none' })
                .to(title, { top: 0, scale: 0.8, translateY: '0%', ease: 'bounce', duration: 1, onComplete: this.onComplete }, '-=0.25')
                .fromTo(subtitle, { scale: 0 }, { autoAlpha: 1, scale: 1, ease: 'power4.inOut', duration: 1 })
                .to(gamesContainer, { pointerEvents: 'auto', autoAlpha: 1 }, '-=0.5')
                .fromTo(games, { y: '-=50' }, { y: '+=50', autoAlpha: 1 }, '-=0.75');
        },
        onComplete() {
            const shake = this.$gsap.timeline({ repeat: -1 });
            shake.to(this.$refs.elTitle, { duration: 1, y: '-=10', repeat: 1, yoyo: true, ease: 'none' })
                .to(this.$refs.elTitle, { duration: 1, y: '+=10', repeat: 1, yoyo: true, ease: 'none' });
        },
        async openGame(gameName) {
            const main = document.getElementsByTagName('main');
            const tl = this.$gsap.timeline();

            await tl.fromTo(main, { position: 'fixed' }, { translateY: '100%', duration: 1 });
            this.$router.push({ name: gameName, params: { home: true } });
        },
    },
};
</script>

<style lang="scss" scoped>

    .title {
        padding-left: 5px;
        box-sizing: border-box;
        font-family: Pixel;
        color: white;
        letter-spacing: 5px;
        font-size: 8.5vw;
    }

    .subtitle {
        margin-bottom: 30px;
        color: white;
        font-family: Undo;
        font-size: 50px;
    }

    .games-container {
        width: 1100px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        font-family: Undo;
        pointer-events: auto; // none

        .game-card {
            flex: 1;
            height: 175px;
            position: relative;
            margin: 20px;
            background: rgba(#1d2329,.75);
            box-shadow: -6px 6px 1px rgba(0, 0, 0, 0.3);
            border-radius: 20px;
            color: white;
            box-sizing: border-box;
            cursor: pointer;
            transition: all .5s ease-in-out;

            .card-inner {
                width: calc(100% - 20px);
                height: calc(100% - 20px);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 10px;

                .icon {
                    margin-bottom: 10px;

                    .svg {
                        width: 75px;
                        height: 75px;
                        fill: white;
                        transition: all .5s ease-in-out;
                    }

                    .svg.big {
                        transform: scale(1.25);
                    }
                }

                .name {
                    font-size: 30px;
                }

                .name.small {
                    font-size: 26px;
                }
            }

            &:after {
                content: '';
                width: 50px;
                height: 50px;
                position: absolute;
                top: 10px;
                left: 10px;
                z-index: 1;
                border-top: 3px solid #32892F;
                border-left: 3px solid #32892F;
                border-top-left-radius: 15px;
                transition: all .5s ease-in-out;
            }

            &:before {
                content: '';
                width: 50px;
                height: 50px;
                position: absolute;
                bottom: 10px;
                right: 10px;
                z-index: 1;
                border-bottom: 3px solid #32892F;
                border-right: 3px solid #32892F;
                border-bottom-right-radius: 15px;
                transition: all .5s ease-in-out;
            }

            &:hover:after, &:hover:before {
                width: calc(100% - 60px);
                height: calc(100% - 60px);
            }

            &:hover {
                transform: scale(1.1) !important;
            }

            &:hover > .card-inner > .icon > .svg {
                fill: #32892F;
            }
        }
    }

    @media (max-width: 1099px) and (min-width:800px) {
        .games-container {
            width: 100%;
            flex-wrap: wrap;

            .game-card {
                flex: 0 0 45%;
            }
        }
    }

    @media (max-width: 799px) {
        .games-container {
            width: 80%;
            flex-direction: column;

            .game-card {
                width: 100%;
            }
        }
    }

     @media (max-width: 767px) {
        .title {
            margin-top: 30px;
            font-size: 9vw;
        }

        .subtitle {
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 10vw;
        }
    }

</style>
