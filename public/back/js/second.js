$(function(){
    var currentPage=1;
    var pageSize=5;
    function fenye(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                // console.log(data);
                $('tbody').html(template('tel',data));

                
                $('#paginator').bootstrapPaginator({
                        bootstrapMajorVersion:3,
                        currentPage:currentPage,
                        totalPages:Math.ceil(data.total/pageSize),
                        onPageClicked:function(a,b,c, page){
                            currentPage=page;
                            fenye();
                        }
                });
            }
        })
    }
    fenye();

    // 弹出模态框
    $('.btn_add').on('click',function(){
        $('#addModal').modal('show');

        // 下拉框获取数据 这里的参数可以随便写
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
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

    // 让文字显示在input里

    // 委托事件 
   
    $('.dropdown-menu').on('click','a',function(){
        // text()设置标签里的内容 不包括标签
        $('.dropdown-text').text($(this).text());
        $('#categoryId').val($(this).data('id'));
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
        
    });

    // 文件上传
    $('#fileupload').fileupload({
        dataType:"json",
        done:function(e,data){
            console.log(data);
            $(".img_box img").attr("src",data.result.picAddr);
            $('#brandLogo').val(data.result.picAddr);
            // $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });
    // 表单校验
    var $form =$("form");
    $form.bootstrapValidator({
        //设置不校验的内容，所有的都校验
        excluded:[],
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
          categoryId:{
            validators:{
              notEmpty:{
                message:"请选择一级分类"
              }
            }
          },
          brandName:{
            validators:{
              notEmpty:{
                message:"请输入二级分类的名称"
              }
            }
          },
          brandLogo:{
            validators:{
              notEmpty:{
                message:"请上传图片"
              }
            }
          },
        }
      });
    
    
      //注册成功事件
    // 商品、图片添加到页面
      $form.on("success.form.bv", function (e) {
        e.preventDefault();
    
        $.ajax({
          type:"post",
          url:"/category/addSecondCategory",
          data:$form.serialize(),
          success:function (data) {
            if(data.success){
    
              //关闭模态框
              $("#addModal").modal("hide");
    
              //重新渲染第一页
              currentPage = 1;
              fenye();
    
              //内容清掉
              $form[0].reset();
              $form.data("bootstrapValidator").resetForm();
              $(".dropdown-text").text("请选择一级分类");
              $(".img_box img").attr("src", "images/none.png");
              $("#categoryId").val("");
              $("#brandLogo").val("");
    
            }
          }
        });
    
      });
})