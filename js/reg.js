const loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
    if (!val) {
        return '请填写账号'
    }
    const { data } = await API.exists(val)
    if (data) {
        return '账号已经存在, 请重新输入'
    }
})

const nickNameValidator = new FieldValidator('txtNickname', function (val) {
    if (!val) {
        return '请填写昵称'
    }
})

const loginPwdValidator = new FieldValidator('txtloginPwd', function (val) {
    if (!val) {
        return '请填写密码'
    }
})

const loginPwdConfirmValidator = new FieldValidator('txtloginPwdConfirm', function (val) {
    if (!val) {
        return '请填写确认密码'
    }

    if (val !== loginPwdValidator.input.value) {
        return '两次密码不一致'
    }
})



const form = $('form').onsubmit = async function (e) {
    e.preventDefault()
    const result = await FieldValidator.validate(loginIdValidator, nickNameValidator, loginPwdValidator, loginPwdConfirmValidator)
    console.log(result)
    if (!result) {
        return; // 验证不通过
    }
    const obj = { loginId: loginIdValidator.input.value, nickname: nickNameValidator.input.value, loginPwd: loginPwdValidator.input.value }
    console.log(obj)
    // const resp = await API.reg(obj)
    // console.log(resp)


    // 拿到表单对象
    const formData = new FormData(this) // 传入表单dom,得到里面的数据; input需要name属性。 
    // window.formData = formData
    const json = Object.fromEntries(formData.entries())
    console.log(json)
    const { code } = await API.reg(json)
    if (code === 0) {
        alert('注册成功, 点确定，跳转到登陆页')
        location.href = 'login.html'
    }
}
