// 进度条的插件
NProgress.configure({showSpinner:false});
$(document).ajaxStart(function(){
    NProgress.start();
})
$(document).ajaxStop(function(){
    setInterval(function(){
        NProgress.done();
    },500);
    
});

// 如果登入其他页面不能访问首页
if(location.href.indexOf('login.html') ==-1){
    $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    success:function(data){
        if(data.error===400){
            location.href="login.html";
        }
    }
});
}



// 让二级菜单显示和隐藏
// prev()上一个兄弟
// slideToggle() 上下切换有默认时间
$('.child').prev().on('click',function(){
  $(this).next().slideToggle();
})
// 左边显示与隐藏
$('.btn_menu').on('click',function(){
    // toggle()显示与隐藏
    $('.left').toggleClass('now');
    $('.right').toggleClass('now');
    
})
// 模态框显示与隐藏
$('.btn-logout').on('click',function(){
   $('#logoutModal').modal('show');
// 登入成功进入首页
$('.btn_confirm').off().on('click',function(){
    // console.log('sss0');
    $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        success:function(data){
            console.log(data);
            if(data.success){
                location.href = "login.html";
            }
        }
    })
})

});