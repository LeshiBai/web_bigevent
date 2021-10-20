$(function(){
    getUserInfo()
})
//获取用户的基本信息
function getUserInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success:function(res){
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
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text_avatar').hide()
    } else {
        var first = name[0].toUpperCase()
        $('.text_avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}