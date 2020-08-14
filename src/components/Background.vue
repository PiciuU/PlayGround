<template>
    <div ref="elBackground" class="background">
        <span style="--t:15%;--l:26%;--b:80%;--deg:90deg;--x:9px;--y:16px" data-speed="-5" class="layer"></span>
        <span style="--t:85%;--l:62%;--b:10%;--deg:180deg;--x:13px;--y:4px" data-speed="7" class="layer"></span>
        <span style="--t:10%;--l:90%;--b:10%;--deg:270deg;--x:-10px;--y:9px" data-speed="9" class="layer"></span>
        <span style="--t:58%;--l:15%;--b:25%;--deg:-90deg;--x:5px;--y:-8px" data-speed="-4" class="layer"></span>
        <span style="--t:50%;--l:45%;--b:50%;--deg:-270deg;--x:12px;--y:-12px" data-speed="-8" class="layer"></span>
        <span style="--t:20%;--l:70%;--b:60%;--deg:-180deg;--x:4px;--y:7px" data-speed="5" class="layer"></span>
    </div>
</template>

<script>
export default {
    name: 'Background',
    mounted() {
        this.animate();
    },
    methods: {
        animate() {
            const background = this.$refs.elBackground;
            this.$gsap.set([...background.children], { autoAlpha: 0 });

            const tl = this.$gsap.timeline({});

            tl.to(background.children, { duration: 2, autoAlpha: 1, stagger: 0.3 });
        },
    },
    // created() {
    //     document.addEventListener('mousemove', this.parallax);
    // },
    // beforeDestroy() {
    //     document.removeEventListener('mousemove', this.parallax);
    // },
    // methods: {
    //     parallax(e) {
    //         document.querySelectorAll('.layer').forEach((layer) => {
    //             const obj = layer;
    //             const speed = layer.getAttribute('data-speed');
    //             const x = (window.innerWidth - e.pageX * speed) / 500;
    //             const y = (window.innerHeight - e.pageY * speed) / 500;

    //             obj.style.transform = `translateX(${x}px) translateY(${y}px)`;
    //         });
    //     },
    // },
};
</script>

<style lang="scss" scoped>
    .background {
        width: 100%;
        min-height: 100%;
        position: fixed;
        background: radial-gradient(circle,#182e44, #1c2731, #101418, #0d1114);
        z-index: -1;

        span {
            position: absolute;
            top: var(--t);
            left: var(--l);
            bottom: var(--b);
            animation: colorChange 5s linear infinite, moveAnim 5s linear infinite alternate;

            &:before {
                content: '';
                width: 30px;
                height: 30px;
                position: absolute;
                top: 50%;
                left: -8px;
                background: #f00;
                border-radius: 50%;
                opacity: 0.75;
            }

            &:nth-child(1):before {
                background: rgba(67,116,11,1);
                box-shadow: 0 0 20px rgba(67,116,11,1),
                            0 0 40px rgba(67,116,11,1),
                            0 0 60px rgba(67,116,11,1),
                            0 0 80px rgba(67,116,11,1),
                            0 0 0 8px rgba(67,116,11,.1);
            }

            &:nth-child(2):before {
                background: rgba(129,108,4,1);
                box-shadow: 0 0 20px rgba(129,108,4,1),
                            0 0 40px rgba(129,108,4,1),
                            0 0 60px rgba(129,108,4,1),
                            0 0 80px rgba(129,108,4,1),
                            0 0 0 8px rgba(129,108,4,.1);
            }

            &:nth-child(3):before {
                background: rgba(12,117,131,1);
                box-shadow: 0 0 20px rgba(12,117,131,1),
                            0 0 40px rgba(12,117,131,1),
                            0 0 60px rgba(12,117,131,1),
                            0 0 80px rgba(12,117,131,1),
                            0 0 0 8px rgba(12,117,131,.1);
            }

            &:nth-child(4):before {
                background: rgba(230,41,12,1);
                box-shadow: 0 0 20px rgba(230,41,12,1),
                            0 0 40px rgba(230,41,12,1),
                            0 0 60px rgba(230,41,12,1),
                            0 0 80px rgba(230,41,12,1),
                            0 0 0 8px rgba(230,41,12,.1);
            }

            &:nth-child(5):before {
                background: rgba(204,13,194,1);
                box-shadow: 0 0 20px rgba(204,13,194,1),
                            0 0 40px rgba(204,13,194,1),
                            0 0 60px rgba(204,13,194,1),
                            0 0 80px rgba(204,13,194,1),
                            0 0 0 8px rgba(204,13,194,.1);
            }

            &:nth-child(6):before {
                background: rgba(13,42,204,1);
                box-shadow: 0 0 20px rgba(13,42,204,1),
                            0 0 40px rgba(13,42,204,1),
                            0 0 60px rgba(13,42,204,1),
                            0 0 80px rgba(13,42,204,1),
                            0 0 0 8px rgba(13,42,204,.1);
            }
        }
    }

    @keyframes colorChange {
        0% {
            filter: hue-rotate(0deg);
        }

        100% {
            filter: hue-rotate(360deg);
        }
    }

    @keyframes moveAnim {
        0% {
            transform: rotate(0deg) translate(0px,0px);
        }

        100% {
            transform: rotate(var(--deg)) translate(var(--x),var(--y));
        }
    }
</style>
