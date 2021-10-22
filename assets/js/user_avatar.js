$(function () {
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)
    //给上传按钮绑定事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    //给input标签添加改变事件
    $('#file').on('change', function (e) {
        console.log(e);
        var filelist = e.target.files
        if (filelist.length === 0) {
            return '请选择照片'
        }
        //把文件转化为路径
        var imgURL = URL.createObjectURL(e.target.files[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //将裁剪后的头像上传到服务器
    $('#upLoad').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method:'POST',
            url:'/my/update/avatar',
            data:{
                avatar:dataURL
            },
            success:function(res) {
                if (res.status !==0) {
                    return layer.msg('上传头像失败')
                }
                layer.msg('上传头像成功')
                window.parent.getUserInfo()
            }

        })
    })
})
