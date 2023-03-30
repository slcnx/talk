
const xhr = new XMLHttpRequest()

// 用户注册
function reg({ loginId, nickname, loginPwd } = {}) {
    xhr.open('POST', 'http://study.duyiedu.com/api/user/reg')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ loginId, nickname, loginPwd }))
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                resolve(JSON.parse(xhr.responseText))
            }
        }
    })
}


// 用户登陆
function login({ loginId, loginPwd } = {}) {
    xhr.open('POST', 'http://study.duyiedu.com/api/user/login')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ loginId, loginPwd }))
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (this.readyState === 3) {
                localStorage.setItem('token', xhr.getResponseHeader('Authorization'))
            }
            if (this.readyState === 4) {
                resolve(JSON.parse(xhr.responseText))
            }
        }
    })
}

// 验证账号
function exists(loginId) {
    xhr.open('GET', `http://study.duyiedu.com/api/user/exists?loginId=${loginId}`)
    // xhr.setRequestHeader('Content-Type', 'application/json') // GET不需要请求体，何来指定请求体内容类型
    xhr.send(null) // 无请求体
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                resolve(JSON.parse(xhr.responseText))
            }
        }
    })
}

// 用户信息
function profile() {
    xhr.open('GET', `http://study.duyiedu.com/api/user/profile`)
    // xhr.setRequestHeader('Content-Type', 'application/json') // GET不需要请求体，何来指定请求体内容类型

    const token = localStorage.getItem('token')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.send(null) // 无请求体
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                resolve(JSON.parse(xhr.responseText))
            }
        }
    })
}

// 发聊天消息
function sendChat(content) {
    xhr.open('POST', 'http://study.duyiedu.com/api/chat')
    xhr.setRequestHeader('Content-Type', 'application/json')
    const token = localStorage.getItem('token')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.send(JSON.stringify({ content }))
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                resolve(JSON.parse(xhr.responseText))
            }
        }
    })
}

// 获取聊天消息
function getHistory() {
    xhr.open('GET', `http://study.duyiedu.com/api/chat/history`)
    // xhr.setRequestHeader('Content-Type', 'application/json') // GET不需要请求体，何来指定请求体内容类型

    const token = localStorage.getItem('token')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.send(null) // 无请求体
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                resolve(JSON.parse(xhr.responseText))
            }
        }
    })
}