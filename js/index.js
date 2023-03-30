// 验证是否有登陆，没有登陆，跳转到登陆页。
// 有登陆，获取登陆的用户信息

(async () => {
    // 是否登陆


    // 1) 登陆成功，全局变量。window.isLogin=true
    // 跳转页面之后，刷新页面，全局变量没有了。
    // 写localstorage: 1）别人可以修改；

    // 2) 看localstorage是否存在token
    // 没有token，可以添加一个，伪造一个

    // 3) 正确就调用profile()方法   
    // API.profile().then(({ code, data }) => {
    //     console.log(code, data)
    // })

    const { code, data: user } = await API.profile()

    if (code !== 0) {
        alert('未登陆，或登陆已过期，请重新登陆')
        location.href = 'login.html'
        return;
    }

    // 一定是登陆状态
    const doms = {
        aside: {
            nickname: $('#nickname'),
            loginId: $('#loginId')
        },
        close: $('.close'),
        content: $('ul.content'),
        msgForm: $('.msg-form')
    }

    // 设置用户信息
    function setUserInfo() {
        doms.aside.nickname.innerText = user.nickname
        doms.aside.loginId.innerText = user.loginId
    }

    setUserInfo()

    // 注销
    doms.close.onclick = function () {
        API.loginOut()
        location.href = 'login.html'
    }

    // 获取历史记录
    await loadHistory()


    // 发送消息事件
    sendChat()

    function sendChat() {
        doms.msgForm.onsubmit = async function (e) {
            e.preventDefault()
            const input = this.querySelector('#txtMsg')
            const value = input.value.trim()
            if (!value) {
                return;
            }
            // 第1时间，发出去
            addChart({
                'from': 'leo_song',
                'content': value,
                'createdAt': new Date().getTime()
            })
            scrollBottom()
            input.value = ''
            // 后面什么时候返回，放在异步中。
            const { code, data } = await API.sendChat(value)
            console.log(data)
            if (code === 0) {
                addChart({
                    from: null,
                    ...data
                })
                scrollBottom()
            }
        }
    }




    async function loadHistory() {
        // const msg = {
        //     "_id": "64238ab60d9b2d7e81dd8aaf",
        //     "from": "leo_song",
        //     "to": null,
        //     "content": "你好，你几岁啦？",
        //     "createdAt": 1680050870343
        // }
        // addChart(msg)

        const historys = await API.getHistory()
        historys.data.forEach(item => addChart(item))
        console.log(doms.content.scrollTop, doms.content.scrollHeight)
        // 聊天区域的滚动条，滚动到最后
        scrollBottom()
    }
    function scrollBottom() {
        // 1. 每个元素有方法，滚动到元素所在位置。

        // 2. 设置容器的scrollTop
        doms.content.scrollTop = doms.content.scrollHeight
    }


    /**
     * 消息对象添加到页面
                         <li class="item">
                        <img src="asset/robot-avatar.jpg" alt="">
                        <div class="msg">
                            <p>讨厌，不要随便问女生年龄知道不</p>
                            <div class="time">2022-04-29 14:18:16</div>
                        </div>
                    </li>
     */
    function addChart({ from, to, content, createdAt }) {

        let imgsrc = 'asset/robot-avatar.jpg'

        const li = $$$('li')
        li.className = 'item'

        // 人发的，from有值
        if (from) {
            li.classList.add('right')
            imgsrc = 'asset/avatar.png'
        }

        // li.innerHTML = `
        //     <img src="${imgsrc}" alt="">
        //     <div class="msg">
        //         <p>${content}</p>
        //         <div class="time">${formatTime(createdAt)}</div>
        //     </div>
        // `

        const img = $$$('img')
        img.src = imgsrc
        const div = $$$('div')
        div.classList.add('msg')
        li.appendChild(img)
        li.appendChild(div)

        const p = $$$('p')
        p.innerText = content
        div.appendChild(p)

        const time = $$$('div')
        time.classList.add('time')
        time.innerText = formatTime(createdAt)
        div.appendChild(time)
        doms.content.appendChild(li)

    }


    /**
     * 
     * @param {*} time utc时间戳
     */
    function formatTime(time) {
        const date = new Date(time)
        return `${date.getFullYear().toString().padStart(2, 0)}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)} ${date.getHours().toString().padStart(2, 0)}:${date.getMinutes().toString().padStart(2, 0)}:${date.getSeconds().toString().padStart(2, 0)}`
    }
})()    