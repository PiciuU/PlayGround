<template>
    <main>
        <div class="game-container">
            <div ref="board" class="board">
                <div v-for="(n, col) in 3" :key="col">
                    <div v-for="(n, row) in 3" :key="row">
                        <div class="cell" @click="gameManager(col,row)">
                            <transition name="scale">
                                <span :id="`${col}-${row}`" v-if="game.board[col][row] !== ''" :class="{ 'green' : game.board[col][row] === player, 'red' : game.board[col][row] === computer}">{{ game.board[col][row] }}</span>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
            <transition name="fade">
                <div v-if="gameOver" class="gameover">
                    <div class="winner">{{ gameWinner }}</div>
                    <button class="play-again" @click="restartGame">
                        Play Again
                    </button>
                </div>
            </transition>
        </div>
    </main>
</template>

<script>
class Game {
    constructor() {
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        this.player = null;
        this.computer = null;
    }

    assignMark() {
        if (this.player !== null) {
            this.computer = this.player === 'x' ? 'o' : 'x';
            return this.computer;
        }
        const marks = ['x', 'o'];
        const index = Math.floor(Math.random() * 2);
        this.player = marks[index];
        return marks[index];
    }

    gameOver() {
        return this.availableMoves().length === 0 || this.hasWinningPattern(this.player) || this.hasWinningPattern(this.computer);
    }

    availableMoves() {
        const moves = [];
        for (let col = 0; col < 3; col += 1) {
            for (let row = 0; row < 3; row += 1) {
                if (this.board[col][row] === '') {
                    moves.push({ x: col, y: row });
                }
            }
        }
        return moves;
    }

    cloneBoard() {
        const clone = new Game();
        for (let col = 0; col < 3; col += 1) {
            for (let row = 0; row < 3; row += 1) {
                clone.board[col][row] = this.board[col][row];
            }
        }
        return clone;
    }

    getScore() {
        let score = 0;
        if (this.hasWinningPattern('x')) {
            score -= 10;
        }
        if (this.hasWinningPattern('o')) {
            score += 10;
        }
        return score;
    }

    makeMove(col, row, mark) {
        if (this.board[col][row] !== '') return false;
        this.board[col][row] = mark;
        return true;
    }

    hasWinningPattern(mark) {
        for (let i = 0; i < 3; i += 1) {
            if (this.board[0][i] === mark && this.board[1][i] === mark && this.board[2][i] === mark) {
                return true;
            }
        }

        for (let i = 0; i < 3; i += 1) {
            if (this.board[i][0] === mark && this.board[i][1] === mark && this.board[i][2] === mark) {
                return true;
            }
        }

        if (this.board[0][0] === mark && this.board[1][1] === mark && this.board[2][2] === mark) {
            return true;
        }
        if (this.board[2][0] === mark && this.board[1][1] === mark && this.board[0][2] === mark) {
            return true;
        }

        return false;
    }
}
export default {
    name: 'TicTacToe',
    data() {
        return {
            game: null,
            player: null,
            computer: null,
            gameOver: false,
            moveInProgress: false,
            gameWinner: null,
        };
    },
    created() {
        this.initiateGame();
    },
    mounted() {
        this.animatePage();
    },
    methods: {
        animatePage() {
            const gameContainer = document.getElementsByTagName('main');
            const boardContainer = this.$refs.board;
            const tl = this.$gsap.timeline();

            if (this.$attrs.slide) {
                tl.fromTo(gameContainer, { translateY: '-100%' }, { translateY: '0%', duration: 1 })
                    .fromTo(boardContainer, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, ease: 'back', duration: 1 });
            } else {
                tl.fromTo(gameContainer, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 1 })
                    .fromTo(boardContainer, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, ease: 'back', duration: 1 });
            }
        },
        initiateGame() {
            this.game = new Game();
            this.player = this.game.assignMark();
            this.computer = this.game.assignMark();
        },
        async gameManager(col, row) {
            if (this.gameOver || this.moveInProgress) return;
            if (!this.game.makeMove(col, row, this.player)) return;
            await this.$forceUpdate();
            if (this.game.gameOver()) {
                this.gameOver = true;
                this.gameWinner = this.game.hasWinningPattern(this.player) ? 'You win!' : 'Draw';
                this.gameOverAnimation();
                return;
            }
            const computerMove = this.minimax(this.game.cloneBoard(), this.computer);
            this.game.makeMove(computerMove.move.x, computerMove.move.y, this.computer);
            this.moveInProgress = true;
            const delay = (ms) => new Promise((res) => setTimeout(res, ms));
            await delay(200);
            this.$forceUpdate();
            await delay(50);
            this.moveInProgress = false;
            if (this.game.gameOver()) {
                this.gameOver = true;
                this.gameWinner = this.game.hasWinningPattern(this.computer) ? 'You lose!' : 'Draw';
                this.gameOverAnimation();
            }
        },
        minimax(board, computer, depth = 1) {
            if (board.gameOver()) {
                return {
                    score: board.getScore() + depth,
                    move: null,
                };
            }
            const moves = board.availableMoves();
            if (moves.length === 8 && Math.floor(Math.random() * 2) === 1) {
                return {
                    score: board.getScore() + depth,
                    move: moves[Math.floor(Math.random() * 8)],
                };
            }
            let bestScore = computer === 'o' ? -100 : 100;
            let bestMove = null;
            for (let i = 0; i < moves.length; i += 1) {
                const move = moves[i];
                const newBoard = board.cloneBoard();
                newBoard.player = this.player;
                newBoard.computer = this.computer;
                newBoard.makeMove(move.x, move.y, computer);
                const { score } = this.minimax(newBoard, computer === 'x' ? 'o' : 'x', depth + 1);
                if ((computer === 'x' && score < bestScore) || (computer === 'o' && score > bestScore)) {
                    bestScore = score;
                    bestMove = move;
                }
            }
            return {
                score: bestScore,
                move: bestMove,
            };
        },
        gameOverAnimation() {
            this.$gsap.to(this.$refs.board, { opacity: 0.25, duration: 1, delay: 0.35 });
        },
        restartGame() {
            this.$gsap.to(this.$refs.board, { opacity: 1, duration: 1 });
            this.gameOver = false;
            this.gameWinner = null;
            this.initiateGame();
        },
    },
};
</script>

<style lang="scss" scoped>
    .game-container {
        width: 800px;
        height: 600px;
        position: relative;
        border-radius: 25px;
        background: rgb(29, 35, 41);
        box-shadow: 0 0 15px rgba(0,0,0,.2);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .25s ease-in-out;

        .gameover {
            width: 100%;
            height: 100%;
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .winner {
                color: white;
                font-size: 120px;
                font-family: Undo;
            }

            .play-again {
                width: 200px;
                height: 50px;
                border-radius: 15px;
                margin-top: 20px;
                border: none;
                outline: none;
                cursor: pointer;
                font-family: Undo;
                font-size: 28px;
                letter-spacing: 2px;
                transition: all .35s ease-in-out;

                &:hover {
                    transform: scale(1.2);
                }
            }

        }

        &:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 25px;
            top:50px;
            right:50px;
            background: rgba(0, 0, 0, 0.3);
            z-index: -1;
        }

        .board {
            display: flex;

            div:last-child > div > .cell {
                border-right: none;
            }
            div > div:last-child > .cell {
                border-bottom: none;
            }
        }

        .cell {
            width: 150px;
            height: 150px;
            border-right: 5px solid whitesmoke;
            border-bottom: 5px solid whitesmoke;
            font-size: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Undo;
            transition: all .15s linear;

            &:hover {
                transition: all .15s linear;
                background: rgb(24, 27, 29);
            }

            .green { color: #32892F; }
            .red { color: #e73232; }
            .stroke { transform: scale(5); }
        }

    }

    @media (max-width: 850px) {
        .game-container {
            width: 90%;
            height: calc(60vw + 100px);
            margin: 20px 0px;

            &:after {
                top: 10px;
                right: 10px;
            }

            .cell {
                width: calc(60vw / 3);
                height: calc(60vw / 3);
            }

            .gameover > .winner, .cell {
                font-size: 64px;
            }
        }
    }

    .scale-enter-active, .scale-leave-active {
        transition: transform .5s;
    }

    .scale-enter, .scale-leave-to {
        transform: scale(0);
    }

    .fade-enter-active {
        transition: opacity 1s .5s;
    }

    .fade-leave-active {
        transition: opacity .25s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

</style>
