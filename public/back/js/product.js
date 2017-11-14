$(function(){
    var currenPage =1;
    var pageSize =5;
//  渲染页面
    function fenye(){
            $.ajax({
                type:'get',
                url:'/product/queryProductDetailList',
                data:{
                    page:currenPage,
                    pageSize: pageSize
                },
                success:function(data){
                        // console.log(data);
                        // 渲染
                        $('tbody').html(template('tel',data));

                        // 分页
                        $('#paginator').bootstrapPaginator({
                            bootstrapMajorVersion:3,
                            currenPage:currenPage,
                            totalPages:Math.ceil(data.total/pageSize),
                            onpageClicked:function(a,b,c,page){
                                currenPage=page;
                                // 在渲染页面
                                fenye();
                            }
                        })
                }
            })
    }
    fenye();
    
    // 显示模态款
    $('.btn_add').on('click',function(){
        //  用ajax先获取二级分类的数据在渲染到下拉款中
        $('#addModal').modal('show');
         $.ajax({
        type:'get',
        url:"/category/querySecondCategoryPaging",
        data:{
            page:1,
            pageSize:100
        },
        success:function(data){
            // console.log(data);
            $('.dropdown-menu').html(template('tel2',data));
        }
    });
});
// ul里的子显示在input里
// 把文本设置给input
// 把id设置给他
        $(".dropdown-menu").on('click','a',function(){
            $(".dropdown-text").text($(this).text());
            $("#brandId").val($(this).data("id"));
            $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
        });

   

    // 表单校验
    var $form=$("form");
    $form.bootstrapValidator({
        excluded:[],
        feecbackIcons:{
            valid:"glyphicon glyphicon-ok",
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请选择二级分类"
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入商品库存"
                    },
                   regexp:{
                regexp:/^[1-9]\d*$/,
                message:"请输入正确的数子"
                         }  ,
                }
            },
            size: {
                validators: {
                  notEmpty: {
                    message: "请输入商品尺码"
                  },
                  regexp: {
                    regexp: /^\d{2}-\d{2}$/,
                    message: "请输入正确的尺码（比如：30-50）"
                  }
                }
              },
              oldPrice: {
                validators: {
                  notEmpty: {
                    message: "请输入商品原价"
                  }
                }
              },
              price: {
                validators: {
                  notEmpty: {
                    message: "请输入商品价格"
                  }
                }
              },
              productLogo: {
                validators: {
                  notEmpty: {
                    message: "请上传三张图片"
                  }
                }
              }          
        }
    });
    // 上传图片
    $('#fileupload').fileupload({
        dataType:'json',
        done:function(e,data){
            // 如果上传的图片大于3张就取消
            if($('.img_box').find('img').length>3){
                return false;
            }
            // 上传的结果在data.result中
            $('.img_box').append('<img data-name="'+data.result.picName+'" data-src="'+data.result.picAddr+'" src="'+data.result.picAddr+'" width="100" height="100" alt="">')
            if($('.img_box').find('img').length===3){
                //校验 成功
                $form.data('bootstrapValidator').updateStatus('productLogo',"VALID");
            }else{
                $form.data('bootstrapValidator').updateStatus('productLogo',"INVALID");
            }
            // 消除上传的图片
            $(".img_box").find('img').off().on('dbclick',function(){
                    $(this).remove();
                    if($('.img_box').find('img').length===3){
                        //校验 成功
                        $form.data('bootstrapValidator').updateStatus('productLogo',"VALID");
                    }else{
                        $form.data('bootstrapValidator').updateStatus('productLogo',"INVALID");
                    }
            });

        }
    });
    //给表单注册校验成功事件
    $form.on("success.form.bv",function(e){
        // 阻止默认事件
        e.preventDefault();

        var data=$form.serialize();
        var $img =$(".img_box img");
        data +="&picName1=" + $img[0].dataset.name + "&picAddr1=" + $img[0].dataset.src;
        data +="&picName2=" + $img[1].dataset.name + "&picAddr2=" + $img[1].dataset.src;
        data +="&picName3=" + $img[2].dataset.name + "&picAddr3=" + $img[2].dataset.src;
            $.ajax({
                type:"post",
                url:"/product/addProduct",
                data:data,
                success:function(data){
                    if(data.success){
                        $('#addModal').modal('hide');
                        currenPage=1;
                        fenye();
                        // 重置模态框
                        $form[0].reset();
                        $form.data("bootstrapValidator").resetForm();
                        $(".dropdown-text").text("请选择二级分类");
                        $("#brandId").val("");
                        $(".img_box img").remove();
                        $('#productLogp').val("");
                    }
                }
            });
    });


});