var API = (function () {
    const BASE_URL = 'http://huaweicloud.mykernel.cn'
    const TOKEN_KEY = 'token'

    const get = function (path) {
        // 越通用，难度越高
        const headers = {}
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
            headers.Authorization = `Bearer ${token}`
        }
        // 本身就是promise
        return fetch(BASE_URL + path, { headers }).then(resp => resp.json())
    }

    function post(path, body) {
        const headers = {
            'Content-Type': 'application/json'
        }
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
            headers.Authorization = `Bearer ${token}`
        }

        // 本身就是promise
        return fetch(BASE_URL + path, { method: 'POST', headers, body: JSON.stringify(body) })
    }

    function reg(userInfo) {
        return post('/api/user/reg', userInfo).then(resp => resp.json())

    }

    async function login(loginInfo) {
        const resp = await post('/api/user/login', loginInfo)

        const result = await resp.json()
        if (result.code === 0) {
            // 登陆成功，保存
            localStorage.setItem(TOKEN_KEY, resp.headers.get("Authorization"))
        }
        return result
    }


    function profile() {
        return get('/api/user/profile')
    }


    function exists(loginId) {
        return get(`/api/user/exists?loginId=${loginId}`)
    }

    function sendChat(content) {
        return post('/api/chat', { content }).then(resp => resp.json())
    }

    function getHistory() {
        return get('/api/chat/history')
    }

    function loginOut() {
        localStorage.removeItem(TOKEN_KEY)
    }

    return {
        get, post,
        reg, login, exists, profile, sendChat, getHistory, loginOut
    }
})()