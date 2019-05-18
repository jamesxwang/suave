let OSS = require('ali-oss')

function formatNum(m){
	m = Number(m)
	return m<10 ? '0'+m : m 
}
export default{
	minite2str (minutes) {
		let hour = Math.floor(minutes / 60)
		let minute = minutes % 60
		let timeStr = ''
		if (hour > 0) {
			timeStr += hour + '小时'
		}
		if (minute > 0) {
			timeStr += minute + '分钟'
		}
		return timeStr
	},
	ms2str (mseconds) {
		let msecs = Math.floor(mseconds/10)
		let m = Math.floor(msecs/(100*60))
		let s = Math.floor((msecs-m)/100)
		let ms = msecs%100
		return{
			minute: formatNum(m),
			second: formatNum(s),
			msecond: formatNum(ms)
		}
	},

	getUrlParam () {
		let searchArr = window.location.href.split('?')
		let search = searchArr.length > 1 ? searchArr[1].split('&') : []
		let param = {}
		if (search.length > 0 && search[0].length > 0) {
			search.forEach(item => {
				let temp = item.split('=')
				param[temp[0]] = temp[1]
			})
		}
		return param
	},
	
	// 设置Storage
	setStorage (key, value) {
		if((typeof(value)).toLowerCase() == 'object'){
			value = JSON.stringify(value)
		}
		window.localStorage.setItem(key,value);
	},
	// 获取Storage
	getStorage (key) {
		return window.localStorage.getItem(key);
	},
	// 删除Storage
	removeStorage (key) {
		window.localStorage.removeItem(key);
	},
	// 清空Storage
	clearStorage () {
		window.localStorage.clear();
	},

	// 设置cookie
	setCookie (cname, cvalue, exdays) {
		let d = new Date()
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
		let expires = 'expires=' + d.toUTCString()
		document.cookie = cname + '=' + cvalue + '; ' + expires
	},

	// 获取cookie
	getCookie (cname) {
		let name = cname + '='
		let ca = document.cookie.split(';')
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i]
			while (c.charAt(0) === ' ') c = c.substring(1)
			if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
		}
		return null
	},

	// 清除cookie
	clearCookie () {
		this.setCookie('username', '', -1)
	},
	formatNum(m){
		m = Number(m)
		return m<10 ? '0'+m : m 
	},
	//时间戳转时间
	timestamp2datetime(timestamp){
		var time = new Date(timestamp * 1000);
		var y = time.getFullYear();
		var m = time.getMonth()+1;
		var d = time.getDate();
		var h = time.getHours();
		var mm = time.getMinutes();
		return y+'-'+formatNum(m)+'-'+formatNum(d)+' '+formatNum(h)+':'+formatNum(mm);
	},
	//时间戳转日期
	formatDate(date){
		var time = new Date(date);
		var y = time.getFullYear();
		var m = time.getMonth()+1;
		var d = time.getDate();
		return y+'-'+formatNum(m)+'-'+formatNum(d)
	},

	// 根据属性删除对象数组中的对象
	removeObjFromArrayBy(arr, propObj){
		let key = Object.keys(propObj)[0]
		let value = propObj[key]
		let matchedObj = null
		for(let i = 0; i < arr.length; i++){
			if(arr[i][key] == value){
				matchedObj = {
					index: i,
					item: arr[i]
				}
				break;
			}
		}
		arr.splice(matchedObj.index,1)
		return arr
	},
	imageFile2DataURL(imageFile, maxWidth, maxHeight, quality=1.0, force){
		return new Promise((resolve, reject)=>{
			const reader = new FileReader(),
				oImg = new Image(),
				canvas = document.createElement('canvas'),
				context = canvas.getContext('2d');
			reader.onerror=reject
			oImg.onerror=reject
			oImg.onload = () => {
				let w,h
				if(force){
					w = maxWidth
					h = maxHeight
				}else{
					w = oImg.width
					h = oImg.height
					let	mw = maxWidth || w,
						mh = maxHeight || h,
						rate = Math.max(w/mw,h/mh)
					if(rate>1){
						w = w/rate
						h = h/rate
					}
				}
				canvas.width = w
				canvas.height = h
				context.clearRect(0, 0, w, h)
				context.drawImage(oImg, 0, 0, w, h)
				const dataURL = quality < 1 ? canvas.toDataURL('image/jpeg', quality) : canvas.toDataURL(imageFile.type)
				resolve(dataURL)
			}
			reader.onload= () => oImg.src = reader.result
			reader.readAsDataURL(imageFile)
		})
	},
	imageFileCompress(imageFile, maxWidth, maxHeight, quality, force){
		return this.imageFile2DataURL(imageFile, maxWidth, maxHeight, quality, force).then( dataURL => {
			// console.log(dataURL)
			// const newFile = dataURLtoFile(dataURL)
			// newFile.src = dataURL
			return dataURL
		})
	},
	toBlob(urlData, fileType) {
        let bytes = window.atob(urlData);
        let n = bytes.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bytes.charCodeAt(n);
        }
        return new Blob([u8arr], { type: fileType });
	},
	cloneObj(obj) {
		const clone = {...obj}
		return clone
	},
	getImageURL (uint8Array) {
		return new Promise((resolve, reject)=>{
			const reader = new FileReader()
			reader.onerror=reject
			let buffer = uint8Array.buffer
			let blob = new Blob([buffer])
			reader.onload= (event) => {
				let dataURL = event.target.result
				resolve(dataURL)
			}
			reader.readAsDataURL(blob)
		})
	},
	getAudioURL (uint8Array) {
		return new Promise((resolve, reject)=>{
			const reader = new FileReader()
			reader.onerror=reject
			let buffer = uint8Array.buffer
			let blob = new Blob([buffer])
			reader.onload= (event) => {
				let dataURL = event.target.result.split(',').pop()
				// let dataURL = event.target.result.split(',').pop()
				resolve(dataURL)
			}
			reader.readAsDataURL(blob)
		})
	},
	convertParams2Str(params) {
		return new Promise((resolve, reject)=>{
			let paramStr = '?'
			paramStr += 'index=' + params.i
			if (params.level != null && params.level!= '') {
				paramStr += '&level=' + params.level
			}
			if (params.gender != null && params.gender != '') {
				paramStr += `&gender=${params.gender}`
			}
			if (params.city != null && params.city != '') {
				paramStr += `&city=${params.city}`
			}
			resolve(paramStr)
		})
	},
	getImgOSS (imgKey) {
		return new Promise((resolve, reject) => {
			// 配置
			const client = new OSS({
				endpoint: 'image.suavechat.com',
				region: 'oss-ap-southeast-2',
				//云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
				accessKeyId: 'LTAIcJ2c4DfxlC90',
				accessKeySecret: 'e4AnZMeLZlKvuKuJOSs2Rrk2JzofFw',
				bucket: 'suave-image',
				cname: true
			});
			client.get(imgKey).then((result) => {
				let blobURL = this.getImageURL(result.content)                    
				resolve(blobURL)
			}).catch((err) => {
				reject()
			});
		})
	},
}