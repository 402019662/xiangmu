// jq写
$(function(){

$('form').bootstrapValidator({
    // 表单校验插件
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields:{
        //   对应表格中的name属性
          username:{
              validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    }
              }
          },
          password:{
            validators:{
                notEmpty:{
                    message:"密码不能为空"
                },
                stringLength:{
                    min:6,
                    max:30,
                    message:"用户长度必须在6到30之间"
                },
                regexp:{
                    regexp:/^[a-zA-Z0-9_\.]+$/,
                    message:"用户名由数字字母下划线和.组成"
                }
            }
        }

      },
     
     

});
// 注册表单验证成功事件 此时会提交表单，这时候，通常我们需要禁止表单的自动提交，使用ajax进行表单的提交。
$("form").on('success.form.bv', function (e) {
    // 阻止表单提交默认行为
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$("form").serialize(),
            success:function(data){
            //    console.log(data);
                // 跳转到页面
                if(data.success){
                    location.href="index.html";
                }
                if(data.error===1001){
                    alert('用户名不存在')
                }if(data.error===1001){
                    alert('密码错误')
                }
            }
    })
});


})