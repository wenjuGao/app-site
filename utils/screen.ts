

//  requestFullscreen 方法兼容处理
export const useRequestFullscreen = (elem: HTMLElement) => {
	const key = ['requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen', 'msRequestFullscreen']
	for (const value of key) {
		// @ts-ignore
		if (elem[value]) {
			// @ts-ignore
			elem[value]()
			return true
		}
	}
	return false
}
export const getFullscreenElement = () => {
	const key = ['fullscreenElement', 'webkitFullscreenElement']
	for (const value of key) {
		// @ts-ignore
		if (document[value]) {
			// @ts-ignore
			return document[value]
		}
	}
	return null
}

// 全屏
export const setFullScreen = () => { }


// 锁定指针,锁定指针的元素必须让用户点一下才能锁定,Safari下与全屏功能不可在一个事件触发下同时使用
export const lockPointer = (elem: HTMLElement) => {
	// 如果已经存锁定的元素则不操作,不生效Safari 
	if (document.pointerLockElement) {
		return;
	}
	if (elem) {
		elem.requestPointerLock();
	}
}

// 解除锁定,解锁后再次锁定需要重新激活元素才行,点一下其他DOM然后再激活即可
export const unlockPointer = () => {
	document.exitPointerLock();
}


export const setToc = (id: string | number) => {
	new Promise<void>((resolve) => {
		document.querySelectorAll('.toc-item.active').forEach((element) => {
			element.setAttribute('class', 'toc-item')
		})
		resolve()
	}).then(() => {
		document.querySelector(`.toc-item[data-value=${id}]`)?.setAttribute('class', 'toc-item active')
	})
}

export const tocActive = (top: number) => {
	const list = document.querySelectorAll('.article-content>div>*[id]');
	let result = null, arr: any[] = []
	list.forEach((i: any) => {
		arr.push({
			id: i.getAttribute('id'),
			gap: Math.abs(i.offsetTop - top),
			v: i.offsetTop
		})
	})
	result = arr.sort((a, b) => a.gap - b.gap)[0] || {};
	if (result.id) {
		setToc(result.id)
	}
}


export const lazyLoad = (el: any) => {
	// const animationMap = new WeakMap();
	// // 窗口监视器
	// const ob = new IntersectionObserver((entires) => {
	// 	for (const entry of entires) {
	// 		if (entry.isIntersecting) {
	// 			animationMap.get(entry.target).play();
	// 			ob.unobserve(entry.target);
	// 		}
	// 	}
	// });

	// /**
	//  * 判断给定的元素是否在视图范围之外
	//  * @param {HTMLElement} el - 要判断的元素
	//  * @returns {boolean} - 如果元素在视图范围之外则返回true，否则返回false
	//  */
	// function isBelowViewPort(el: { getBoundingClientRect: () => any }) {
	// 	const rect = el.getBoundingClientRect();
	// 	return rect.top > window.innerHeight;
	// }
	// setTimeout(() => {
	// 	if (!isBelowViewPort(el)) {
	// 		// 只有当元素在视口top值下面的时候才会触发animate
	// 		return;
	// 	}
	// 	const animation = el.animate(
	// 		[
	// 			{
	// 				transform: `translateY(${DISTANCE}px)`,
	// 				opacity: 0.5,
	// 			},
	// 			{
	// 				transform: `translateY(0px)`,
	// 				opacity: 1,
	// 			},
	// 		],
	// 		{
	// 			duration: DURATION,
	// 			easing: "ease",
	// 		}
	// 	);
	// 	animation.pause();
	// 	animationMap.set(el, animation);
	// 	ob.observe(el);
	// }, 0);
	// // app.directive("slideIn", {
	// // 	mounted(el) {

	// // 	},
	// // 	unmounted(el) {
	// ob.unobserve(el);
	// },
	// });
}