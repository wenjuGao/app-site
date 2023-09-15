

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
	let index = 0, min = -Number.MAX_VALUE;
	let result = null
	while (index < list.length) {
		const item: any = list[index]
		if (Math.abs(item.offsetTop - top) > min) {
			min = Math.abs(item.offsetTop - top)
		} else {
			result = item
		}
		index++
	}
	console.log(result);
}