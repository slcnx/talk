const loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
    if (!val) {
        return '请填写账号'
    }
})



const loginPwdValidator = new FieldValidator('txtloginPwd', function (val) {
    if (!val) {
        return '请填写密码'
    }
})


const form = $('form').onsubmit = async function (e) {
    e.preventDefault()
    const result = await FieldValidator.validate(loginIdValidator, loginPwdValidator)
    console.log(result)
    if (!result) {
        return; // 验证不通过
    }

    // 拿到表单对象
    const formData = new FormData(this) // 传入表单dom,得到里面的数据; input需要name属性。 
    const { code } = await API.login(Object.fromEntries(formData.entries()))
    if (code === 0) {
        alert('登陆成功, 点确定，跳转到主页')
        location.href = 'index.html'
    } else {
        loginIdValidator.err.innerHTML = '账号或密码不匹配'
    }
}
