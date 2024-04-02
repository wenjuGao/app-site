<template>
	<div class="card w-full bg-base-100 shadow-xl">
		<div class="card-body p-4 pt-2">
			<h4 class="card-title text-lg relative">
				<span class="i-mdi-clock-time-eight-outline"></span>
				时钟
				<span class="countdown font-mono">
					<span :style="`--value: ${hour};`"></span>: <span :style="`--value: ${minute};`"></span>:
					<span :style="`--value: ${second};`"></span>
				</span>
				<span @click="handleFullScreen"
					  class="i-mdi-fit-to-screen-outline absolute right-0 cursor-pointer"></span>
			</h4>
			<div class="divider m-0 h-0.5"></div>
			<div id="full-screen-clock"
				 :class="`${fullScreen ? 'bg-base-300' : ''} flex-col flex justify-center items-center`">
				<div :class="`clock transition-all ${fullScreen ? 'w-72 h-72 bg-base-300' : 'w-60 h-60'}`">
					<div :style="`transform: rotateZ(${hourRota}deg);`"
						 class="hours-container">
						<div class="hours"></div>
					</div>
					<div :style="`transform: rotateZ(${minuteRota}deg);`"
						 class="minutes-container">
						<div class="minutes"></div>
					</div>
					<div :style="`transform: rotateZ(${secondRota}deg);`"
						 class="seconds-container">
						<div class="seconds"></div>
					</div>
				</div>
				<template v-if="fullScreen">
					<div class="grid grid-flow-col gap-5 text-center auto-cols-max mt-10">
						<div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
							<span class="countdown font-mono text-5xl">
								<span :style="`--value: ${time.hour};`"></span>
							</span>
							时
						</div>
						<div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
							<span class="countdown font-mono text-5xl">
								<span :style="`--value: ${time.minute};`"></span>
							</span>
							分
						</div>
						<div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
							<span class="countdown font-mono text-5xl">
								<span :style="`--value: ${time.second};`"></span>
							</span>
							秒
						</div>
					</div>
					<div class="mt-10 text-center text-2xl">{{ time.year }}-{{ time.month }}-{{ time.day }}</div>
					<div class="mt-10 text-center text-2xl">
						{{ time.solar }}
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup
		lang="ts">
		import { useRequestFullscreen, getFullscreenElement } from '../../utils/screen'
		import { Solar } from 'lunar-typescript'
		const dayjs = useDayjs()
		const fullScreen = ref(false)
		const hour = ref(0)
		const hourRota = ref(0)
		const minute = ref(0)
		const minuteRota = ref(0)
		const second = ref(0)
		const secondRota = ref(0)
		const time = reactive({
			year: dayjs().year(),
			month: dayjs().month() + 1,
			day: dayjs().date(),
			hour: dayjs().hour(),
			minute: dayjs().minute(),
			second: 0,
			week: 0,
			solar: ''
		})

		const initTime = () => {
			requestAnimationFrame(() => {
				const hours = (hour.value = dayjs().hour())
				const minutes = (minute.value = dayjs().minute())
				const seconds = (second.value = dayjs().second())

				hourRota.value = hours * 30 + minutes / 2
				minuteRota.value = minutes * 6
				secondRota.value = seconds * 6
				if (fullScreen.value) {
					const solar = Solar.fromDate(new Date())
					time.year = dayjs().year()
					time.month = dayjs().month() + 1
					time.day = dayjs().date()
					time.hour = dayjs().hour()
					time.minute = dayjs().minute()
					time.second = dayjs().second()
					time.solar = solar.getLunar().toString()
				}
				initTime()
			})
		}

		onMounted(() => {
			// @ts-ignore
			document.exitFullscreenUniversal = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen
			initTime()
			// 指针锁定或解锁
			document.addEventListener('pointerlockchange', pointerlockchange, false)
			document.addEventListener('pointerlockerror', pointerlockerror, false)
			document.addEventListener('fullscreenchange', handleExit, false)
			document.addEventListener('webkitfullscreenchange', handleExit, false)
		})

		const handleExit = () => {
			fullScreen.value = !!getFullscreenElement()
		}
		const pointerlockchange = () => { }
		const pointerlockerror = () => {
		}

		const handleFullScreen = () => {
			const clockDom = document.getElementById('full-screen-clock')
			if (clockDom && useRequestFullscreen(clockDom)) {
				lockPointer(clockDom)
			}
		}

		onUnmounted(() => {
			document.removeEventListener('pointerlockchange', pointerlockchange, false)
			document.removeEventListener('pointerlockerror', pointerlockerror, false)
			document.removeEventListener('fullscreenchange', handleExit, false)
			document.removeEventListener('webkitfullscreenchange', handleExit, false)
		})
</script>

<style lang="postcss"
	   scoped>
	.clock {
		@apply rounded-full bg-no-repeat bg-center relative;
		background-image: url(/img/clock.svg);
		background-size: 88%;

		&::before {
			content: '';
			@apply rounded-full absolute inset-y-1/2 inset-x-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-content w-4 h-4 z-10;
		}

		&::after {
			content: '';
			@apply rounded-full absolute inset-y-1/2 inset-x-1/2 -translate-x-1/2 -translate-y-1/2 bg-error w-4 h-4 z-20;
		}

		.minutes-container,
		.hours-container,
		.seconds-container {
			@apply absolute top-0 right-0 bottom-0 left-0;
		}
	}

	.hours {
		background: #000;
		height: 20%;
		left: 49%;
		position: absolute;
		top: 30%;
		transform-origin: 50% 100%;
		width: 2%;
		border-radius: 6.5px;
	}

	.minutes {
		background: #000;
		height: 35%;
		left: 49%;
		position: absolute;
		top: 15%;
		transform-origin: 50% 100%;
		width: 2%;
		border-radius: 6.5px;
	}

	.seconds {
		background: #f00;
		height: 30%;
		left: 49.5%;
		position: absolute;
		top: 20%;
		transform-origin: 50% 100%;
		width: 1%;
		border-radius: 3.5px;
		z-index: 8;
	}

	@keyframes rotate {
		100% {
			transform: rotateZ(360deg);
		}
	}

	.hours-container {
		animation: rotate 43200s infinite linear;
	}

	.minutes-container {
		transition: transform 0.3s cubic-bezier(0.4, 2.08, 0.55, 0.44);
	}

	.seconds-container {
		transition: transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44);
	}
</style>
