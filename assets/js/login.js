$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //从layui中获取form对象
    var form = layui.form
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd: function(value){
            var pwd = $('.reg-box [name="password"]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    // 发起注册用户的Ajax请求
    //调用layer对象
    var layer = layui.layer
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data = {
            username: $('#form_reg [name="username"]').val(),
            password: $('#form_reg [name="password"]').val()
        }
        $.post('/api/reguser',data,function(res){
            if (res.status !== 0) {
               layer.msg(res.message)
            } else {
                layer.msg('注册成功')
                $('#link_login').click()
            }
        })
    })

    //发起登录的Ajax请求
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !==0) {
                    layer.msg('登录失败！')
                } else {
                    layer.msg('登录成功')
                    localStorage.setItem('token',res.token)
                    location.href = '/index.html'
                }
            }
        })
    })


})