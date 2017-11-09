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