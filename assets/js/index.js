$(function () {
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定要退出登录吗？', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                layui.layer.msg('获取用户信息失败')
            } else {
                renderAvatar(res.data)
            }
        }

    })
}
//渲染用户的头像
function renderAvatar(user) {
    //获取用户的名称
    var name = user.nickname || user.username
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //按需渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        var first = name[0].toUpperCase()
        console.log(first);
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}