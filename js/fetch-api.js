

// 用户注册
async function reg({ loginId, nickname, loginPwd } = {}) {
    const resp = await fetch('http://study.duyiedu.com/api/user/reg', {
        method: 'POST',
        body: JSON.stringify({ loginId, nickname, loginPwd }),
        headers: { 'Content-Type': 'application/json' }
    })
    return await resp.json()
}


// 用户登陆
async function login({ loginId, loginPwd } = {}) {

    const resp = await fetch('http://study.duyiedu.com/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ loginId, loginPwd }),
        headers: { 'Content-Type': 'application/json' }
    })
    localStorage.setItem('token', resp.headers.get("Authorization"))
    return await resp.json()
}

// 验证账号
async function exists(loginId) {
    const resp = await fetch(`http://study.duyiedu.com/api/user/exists?loginId=${loginId}`)
    return await resp.json()
}

// 用户信息
async function profile() {
    const resp = await fetch(`http://study.duyiedu.com/api/user/profile`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return await resp.json()
}

// 发聊天消息
async function sendChat(content) {
    const resp = await fetch('http://study.duyiedu.com/api/chat', {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    localStorage.setItem('token', resp.headers.get("Authorization"))
    return await resp.json()
}

// 获取聊天消息
async function getHistory() {
    const resp = await fetch(`http://study.duyiedu.com/api/chat/history`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return await resp.json()
}