<template>
    <main>
        <div ref="game" class="game-container">
            <div class="selections">
                <div class="selection" :class="{ win: winner === 'player', lose: winner === 'computer' }">
                    <transition name="fade" mode="out-in">
                        <component v-if="playerSelects !== null" :is="playerSelects" key="0"/>
                        <div v-else key="1"> {{ playerScore }} </div>
                    </transition>
                </div>
                <div class="selection mirror" :class="{ win: winner === 'computer', lose: winner === 'player' }">
                    <transition name="fade" mode="out-in">
                        <component v-if="computerSelects !== null" :is="computerSelects" key="0"/>
                        <div v-else key="1"> {{ computerScore }} </div>
                     </transition>
                </div>
            </div>
            <div class="state-holder">
                <transition name="fade-result" mode="out-in">
                    <div class="results" v-if="playerSelects !== null" key="0">
                        <div ref="winner" class="winner"></div>
                        <button class="play-again" @click="restartGame">
                            Play Again
                        </button>
                        <button class="restart-score" @click="restartScore">
                            Restart Score
                        </button>
                    </div>
                    <div class="options" v-else key="1">
                        <div class="option" v-for="(selection,index) in selections" :key="selection.name" @click="gameManager(index)">
                            <component :is="selection.name"/>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </main>
</template>

<script>
import Rock from '@/assets/icons/rps/rock.svg';
import Paper from '@/assets/icons/rps/paper.svg';
import Scrissors from '@/assets/icons/rps/scrissors.svg';

export default {
    name: 'RockPaperScrissors',
    components: {
        Rock,
        Paper,
        Scrissors,
    },
    data() {
        return {
            selections: [
                {
                    name: 'Rock',
                    beats: 'Scrissors',
                },
                {
                    name: 'Paper',
                    beats: 'Rock',
                },
                {
                    name: 'Scrissors',
                    beats: 'Paper',
                },
            ],
            computerSelects: null,
            playerSelects: null,
            playerScore: 0,
            computerScore: 0,
            winner: null,
            gameInProgress: false,
        };
    },
    mounted() {
        this.animatePage();
    },
    methods: {
        animatePage() {
            const gameBoard = this.$refs.game;
            if (this.$attrs.slide) this.$gsap.fromTo(gameBoard, { translateY: '-100%' }, { translateY: '0%', duration: 1 });
            else this.$gsap.fromTo(gameBoard, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 1 });
        },
        async gameManager(index) {
            if (this.gameInProgress) return;
            this.gameInProgress = true;
            const playerSelection = this.playerSelection(index);
            const computerSelection = this.computerSelection();

            const playerWinner = this.isWinner(playerSelection, computerSelection);
            const computerWinner = this.isWinner(computerSelection, playerSelection);

            await this.animateSelections(playerSelection, computerSelection);

            if (playerWinner) setTimeout(() => { this.setScore('player'); }, 500);
            else if (computerWinner) setTimeout(() => { this.setScore('computer'); }, 500);
            else setTimeout(() => { this.setScore(); }, 500);
        },
        playerSelection(index) {
            return this.selections[index];
        },
        computerSelection() {
            const random = Math.floor(Math.random() * this.selections.length);
            return this.selections[random];
        },
        isWinner(firstSelection, secondSelection) {
            return firstSelection.beats === secondSelection.name;
        },
        setScore(type) {
            if (type === 'player') {
                this.playerScore += 1;
                this.$refs.winner.innerHTML = 'You win!';
            } else if (type === 'computer') {
                this.computerScore += 1;
                this.$refs.winner.innerHTML = 'You lose!';
            } else {
                this.$refs.winner.innerHTML = 'Draw!';
            }
            this.winner = type;
        },
        async animateSelections(playerSelection, computerSelection) {
            const delay = (ms) => new Promise((res) => setTimeout(res, ms));
            this.playerSelects = playerSelection.name;
            await delay(250);
            this.computerSelects = computerSelection.name;
        },
        restartGame() {
            this.gameInProgress = false;
            this.playerSelects = null;
            this.computerSelects = null;
            this.winner = null;
        },
        restartScore() {
            this.playerScore = 0;
            this.computerScore = 0;
            this.restartGame();
        },
    },
};
</script>

<style lang="scss" scoped>

    .game-container {
        width: 900px;
        min-height: 460px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 25px;
    }

    .selections {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .selection {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: rgb(29, 35, 41);
            box-shadow: -8px 8px 8px rgba(0, 0, 0, 0.5);
            border: 4px solid rgba(255,255,255,0.75);
            color: white;
            font-size: 100px;
            display: inherit;
            align-items: center;
            justify-content: center;
            transition: all .25s ease-in-out;

            svg {
                width: 100px;
                height: 100px;
                fill: white;
            }

        }

        .selection.mirror {
            box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.5);

            svg {
                transform: scaleX(-1);
            }
        }

        .win { border-color: #32892F; }
        .lose { border-color: #e73232; }
    }

    .results {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: Undo;

            .winner {
                color: white;
                font-size: 120px;
            }

            div, button {
                margin-bottom: 15px;
            }

            button:last-child {
                margin-bottom: 0px;
            }

            .play-again, .restart-score {
                width: 200px;
                height: 50px;
                border-radius: 15px;
                border: none;
                outline: none;
                cursor: pointer;
                font-family: Undo;
                font-size: 28px;
                letter-spacing: 2px;
                transition: all .35s ease-in-out;

                &:hover {
                    background: #1d2329;
                    color: white;
                }
            }
        }

        .active {
            visibility: visible;
        }

    .options {
        display: flex;
        justify-content: space-between;

        .option {
            width: 200px;
            height: 150px;
            position: relative;
            border-radius: 25px;
            background: rgb(29, 35, 41);
            box-shadow: -6px 6px 1px rgba(0, 0, 0, 0.3);
            display: inherit;
            align-items: center;
            justify-content: center;
            cursor:pointer;
            transition: all .25s ease-in-out;

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
                border-top-left-radius: 25px;
                transition: all .15s ease-in-out;
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
                border-bottom-right-radius: 25px;
                transition: all .15s ease-in-out;
            }

            &:hover svg {
                transform:rotate(30deg);
            }

            &:hover:after, &:hover:before {
                width: calc(100% - 60px);
                height: calc(100% - 60px);
            }

            svg {
                width: 90px;
                height: 90px;
                fill: white;
                transition: all .25s ease-in-out;
            }
        }
    }

    @media (max-width: 1023px) {
        .game-container {
            width: 90%;
        }
    }

    @media (max-width:700px) {
        .game-container {
            justify-content: center;
        }

        .selections {
            .selection {
                width: 125px;
                height: 125px;
                font-size: 70px;

                svg {
                    width: 75px;
                    height: 75px;
                }
            }
        }

        .state-holder {
            height:200px;

            .options {
                .option {
                    margin-top: 30px;
                    width: unset;
                    height: unset;
                    flex-basis: 30%;
                    padding: 2px;

                    &:after, &:before {
                        width: 20%;
                        height: 20%;
                    }

                    &:after {
                        top: 5px;
                        left: 5px;
                    }

                    &:before {
                        bottom: 5px;
                        right: 5px;
                    }

                    svg {
                        width: 70%;
                        height: 70%;
                        padding: 5px;
                        box-sizing: border-box;
                    }
                }
            }
        }

        .state-holder > .results {
            margin-top: 20px;
            .winner {
                font-size:60px;
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-result-enter-active, .fade-result-leave-active {
        transition: opacity .25s .25s ease-in-out;
    }
    .fade-enter, .fade-leave-to, .fade-result-enter, .fade-result-leave-to {
        opacity: 0;
    }

</style>
