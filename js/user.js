/**
 * 对单个表单项验证的函数
 */
class FieldValidator {
    /**
     * 仅对文本框验证
            new FieldValidator('txtLoginId', function(val) {
                return '账号不能为空'
                return ''
            })
     * @param {*} txtId  id是下拉列表？这里不考虑。checkbox?
     * @param {*} validatorFn 回调函数，验证规则。参数是值，返回错误消息，没有返回就是没有错误。
     */
    constructor(txtId, validatorFn) {
        this.input = document.getElementById(txtId)
        this.err = this.input.nextElementSibling
        this.validatorFn = validatorFn

        // 什么时间点验证？失去焦点，表单提交。
        // 只能在失焦验证
        // 失焦验证
        this.input.onblur = () => {
            this.validate()
        }
    }


    /**
     * 成功返回true, 失败返回false 
     */
    async validate() {
        const errmsg = await this.validatorFn(this.input.value)
        if (errmsg) {
            this.err.innerHTML = errmsg
            return false
        } else {
            this.err.innerHTML = ''
            return true
        }
    }


    // 静态方法，是在类上，函数上。 FieldValidator.method
    /**
     * 对所有验证器，统一验证，所有通过则通过。一个不通过则false
     * @param {FieldValidator[]} validators 数组每项为 FieldValidator类型。
     */
    static async validate(...validators) {
        const datas = await Promise.all(validators.map(validator => validator.validate()))
        if (datas.some(item => item === false)) {
            return false
        } else {
            return true
        }
    }

}

// // 异步验证的, 上面直接调用，是 Promise pendding
// const loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
//     if (!val) {
//         return '请填写账号'
//     }
//     const { data } = await API.exists(val)
//     if (data) {
//         return '账号已经存在, 请重新输入'
//     }
// })

// const nickNameValidator = new FieldValidator('txtNickname', function (val) {
//     if (!val) {
//         return '请填写昵称'
//     }
// })

// async function test() {
//     return await FieldValidator.validate(loginIdValidator, nickNameValidator)
// }