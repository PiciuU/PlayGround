<template>
    <main>
        <div ref="game" class="game-container">
            <div class="summary">
                <div class="timer" :class="{ 'finish': gameOver }">Time: {{ minutes }}:{{ seconds }}</div>
                <div class="turns" :class="{ 'finish': gameOver }">Turns: {{ turns }}</div>
            </div>
            <div ref="board" class="board" :class="{ 'blur': gameOver }">
                <div v-for="(card, index) in memoryCards" :key="index" @click="flipCard(card)" :class="{ 'flipped': card.isFlipped, 'matched': card.isMatched }" class="memory-card">
                    <div class="front-card"><Hidden></Hidden></div>
                    <div class="back-card"><component :is="card.name"/></div>
                </div>
            </div>
            <transition name="scale">
                <div v-if="gameOver" class="gameover">
                    <button class="play-again" @click="restartGame">
                        Play Again
                    </button>
                </div>
            </transition>
        </div>
    </main>
</template>

<script>
import Hidden from '@/assets/icons/mg/hidden.svg';
import Hat from '@/assets/icons/mg/hat.svg';
import Coins from '@/assets/icons/mg/coins.svg';
import Elixir from '@/assets/icons/mg/elixir.svg';
import Hourglass from '@/assets/icons/mg/hourglass.svg';
import Trophy from '@/assets/icons/mg/trophy.svg';
import Carrot from '@/assets/icons/mg/carrot.svg';
import Bag from '@/assets/icons/mg/bag.svg';
import Diamond from '@/assets/icons/mg/diamond.svg';
import Heart from '@/assets/icons/mg/heart.svg';
import Crown from '@/assets/icons/mg/crown.svg';
import Acorn from '@/assets/icons/mg/acorn.svg';
import Goblin from '@/assets/icons/mg/goblin.svg';

class Deck {
    constructor(deckArray) {
        this.availableCards = [
            {
                id: 1,
                name: 'Hat',
            },
            {
                id: 2,
                name: 'Coins',
            },
            {
                id: 3,
                name: 'Elixir',
            },
            {
                id: 4,
                name: 'Hourglass',
            },
            {
                id: 5,
                name: 'Trophy',
            },
            {
                id: 6,
                name: 'Carrot',
            },
            {
                id: 7,
                name: 'Bag',
            },
            {
                id: 8,
                name: 'Diamond',
            },
            {
                id: 9,
                name: 'Heart',
            },
            {
                id: 10,
                name: 'Crown',
            },
            {
                id: 11,
                name: 'Acorn',
            },
            {
                id: 12,
                name: 'Goblin',
            },
        ];
        this.cards = this.generateDeck(deckArray);
    }

    generateDeck(deckArray) {
        const deck = [];
        for (let i = 0; i < 6; i += 1) {
            deck[i] = this.availableCards[deckArray[i]];
        }
        return deck;
    }
}

export default {
    name: 'MemoryGame',
    components: {
        Hidden,
        Hat,
        Coins,
        Elixir,
        Hourglass,
        Trophy,
        Carrot,
        Bag,
        Diamond,
        Heart,
        Crown,
        Acorn,
        Goblin,
    },
    data() {
        return {
            deckArray: [],
            memoryCards: [],
            flippedCards: [],
            gameOver: false,
            gameInProgress: false,
            turns: 0,
            totalTime: {
                minutes: 0,
                seconds: 0,
            },
        };
    },
    mounted() {
        this.animateGame();
    },
    beforeDestroy() {
        clearInterval(this.gameInProgress);
    },
    computed: {
        seconds() {
            if (this.totalTime.seconds < 10) {
                return `0${this.totalTime.seconds}`;
            }
            return this.totalTime.seconds;
        },
        minutes() {
            if (this.totalTime.minutes < 10) {
                return `0${this.totalTime.minutes}`;
            }
            return this.totalTime.minutes;
        },
    },
    methods: {
        animateGame() {
            const gameContainer = this.$refs.game;
            this.$gsap.fromTo(gameContainer, { translateY: '-100%' }, { translateY: '0%', duration: 1, onComplete: this.initiateGame });
        },
        timerTick() {
            if (this.totalTime.seconds !== 59) {
                this.totalTime.seconds += 1;
                return;
            }
            this.totalTime.minutes += 1;
            this.totalTime.seconds = 0;
        },
        initiateGame() {
            this.deckArray = this.createDeckArray();
            const newDeck = new Deck(this.deckArray);
            const newDeckCopy = new Deck(this.deckArray);
            this.memoryCards = this.memoryCards.concat(newDeck.cards, newDeckCopy.cards);
            this.memoryCards.forEach((card) => {
                this.$vue.set(card, 'isFlipped', false);
                this.$vue.set(card, 'isMatched', false);
            });
            this.shuffleCards();
            this.$gsap.fromTo(this.$refs.board, { scale: 0 }, { scale: 1, duration: 0.75 });
            this.gameInProgress = setInterval(() => this.timerTick(), 1000);
        },
        createDeckArray() {
            const array = [];
            let i = 0;
            while (i < 6) {
                const number = Math.floor(Math.random() * 12);
                if (!array.includes(number)) {
                    array[i] = number;
                    i += 1;
                }
            }
            return array;
        },
        shuffleCards() {
            for (let i = this.memoryCards.length - 1; i > 0; i -= 1) {
                const randomIndex = Math.floor(Math.random() * i);
                const temp = this.memoryCards[i];
                this.$vue.set(this.memoryCards, i, this.memoryCards[randomIndex]);
                this.$vue.set(this.memoryCards, randomIndex, temp);
            }
        },
        flipCard(card) {
            if (card.isMatched || card.isFlipped || this.flippedCards.length === 2) return;
            card.isFlipped = true;
            if (this.flippedCards.length < 2) {
                this.flippedCards.push(card);
            }
            if (this.flippedCards.length === 2) {
                this.matchCards();
            }
        },
        matchCards() {
            if (this.flippedCards[0].name === this.flippedCards[1].name) {
                setTimeout(() => {
                    this.memoryCards.forEach((card) => {
                        if (card.id === this.flippedCards[0].id) {
                            card.isMatched = true;
                        }
                    });
                    this.flippedCards = [];
                    this.turns += 1;
                    this.isGameOver();
                }, 500);
            } else {
                setTimeout(() => {
                    this.memoryCards.forEach((card) => {
                        if (card.id === this.flippedCards[0].id || card.id === this.flippedCards[1].id) {
                            card.isFlipped = false;
                        }
                    });
                    this.flippedCards = [];
                    this.turns += 1;
                }, 700);
            }
        },
        isGameOver() {
            if (this.memoryCards.every((card) => card.isMatched === true)) {
                clearInterval(this.gameInProgress);
                this.gameInProgress = null;
                this.gameOver = true;
            }
        },
        restartGame() {
            this.gameOver = false;
            this.totalTime.seconds = 0;
            this.totalTime.minutes = 0;
            this.turns = 0;
            this.$gsap.to(this.$refs.board, { scale: 0, duration: 0.35 })
                .then(() => {
                    this.memoryCards = [];
                    setTimeout(() => { this.initiateGame(); }, 250);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
    .game-container {
        width: 1100px;
        height: 800px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .summary {
            width: 1000px;
            height: 100px;
            background: rgb(29, 35, 41);
            box-shadow: -6px 6px 1px rgba(0, 0, 0, 0.3);
            border-radius: 25px;
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: white;
            font-family: Undo;

            .timer, .turns {
                font-size: 64px;
                transition: color .5s ease-in-out;
            }

            .finish {
                color: #32892F;
            }
        }

        .board {
            width: 100%;
            height: calc(100% - 200px);
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            align-content: center;
            transition: filter .35s .15s linear;

            .memory-card {
                background: rgb(29, 35, 41);
                box-shadow: 0 0 15px rgba(0,0,0,.4);
                border-radius: 25px;
                box-sizing: border-box;
                transition: transform .6s ease-in-out, filter .5s linear;
                transform-style: preserve-3d;
                width: 150px;
                height: 250px;
                margin: 10px;

                &:hover {
                    transform: scale(1.1);
                }

                .front-card, .back-card {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    z-index: 1;
                }

                .front-card  {
                    svg {
                        transform: scale(3);
                        fill: white;
                        filter: drop-shadow(2px -1px 2px black);
                    }
                }
                .back-card > svg {
                    width: 75%;
                    height: 75%;
                }

                .back-card {
                    transform: rotateY(180deg);
                }
            }

            .memory-card.flipped {
                transform: rotateY(-180deg);
            }

            .memory-card.matched {

                .back-card {
                    overflow: hidden;

                    &:after {
                        animation: shine .5s ease-in-out;
                        animation-fill-mode: forwards;
                        content: "";
                        position: absolute;
                        top: 100%;
                        left: -100%;
                        width: 250%;
                        height: 10%;
                        border-radius: 25px;
                        opacity: 0.45;
                        transform: rotate(45deg);

                        background: goldenrod;
                    }
                }

                .back-card > svg {
                    animation: bump 0.5s linear;
                }
            }

        }

        .board.blur {
            filter: blur(5px);
        }

        .gameover {
            position: absolute;

            .play-again {
                width: 400px;
                height: 100px;
                border-radius: 25px;
                border: none;
                outline: none;
                cursor: pointer;
                font-family: Undo;
                font-size: 64px;
                letter-spacing: 2px;
                transition: all .35s ease-in-out;

                &:hover {
                    transform: scale(1.2);
                }
            }
        }
    }

    @keyframes shine{
        0% {
            top: 100%;
            left: -100%;
        }
        100% {
            top: -100%;
            left: 50%;
        }
    }

    @keyframes bump {
        0%, 100% {
            transform:scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }

    @media (max-width: 1099px) {
        .game-container {
            width: 90%;
            min-height: 900px;

            .summary {
                width: 90%;
            }

            .board {
                .memory-card {
                    width: unset;
                    flex-basis: 20%;
                    min-height: 100px;
                    max-height: 200px;
                }
            }
        }
    }

    @media (max-width: 800px) {
        .game-container {
            min-height: 1100px;
            height: 100%;
            padding: 50px;
            justify-content: flex-start;

            .summary {
                width: calc((30% * 3) + 40px);
                margin-bottom: 20px;
                .timer, .turns {
                    font-size: 8vw;
                }
            }

            .board {
                height: 100%;
                .memory-card {
                    flex-basis: calc(30% - 10px);
                }
            }
        }
    }

    @media (max-width: 500px) {
        .game-container {
            .summary {
                width: calc(100% - 20px);
            }
            .board > .memory-card {
                flex-basis: calc(50% - 20px);
                max-height: 150px;
                .front-card > svg {
                    transform: scale(2);
                }
            }
            .gameover {
                top: 50vh;
                .play-again {
                    width: 90%;
                    font-size: 15vw;
                }
            }
        }
    }

    .scale-enter-active, .scale-leave-active {
        transition: transform .65s;
    }

    .scale-enter-active {
        transition-delay: .25s;
    }

    .scale-enter, .scale-leave-to {
        transform: scale(0);
    }
</style>
