$(function(){
    var currentPage=1;
    var pageSize=5;

   function fenye(){
    $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:{
            page:currentPage,
            pageSize:pageSize
            
        },
            success:function(data){
            // console.log(data);
                 $('tbody').html(template('tel',data));
                //  console.log(data);

                // 渲染分页
             
          $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion: 3,//指定bootstrap的版本，如果是3，必须指定
            currentPage:currentPage,
            totalPages:Math.ceil(data.total/pageSize),
            size:"small",
            onPageClicked:function(a,b,c,page){
                    currentPage=page;
                    fenye();
                    }
            });

          
                                }

        })
        };
          fenye();

        //   切换正常与禁用
     
      $('tbody').on('click','.btn',function(){
            $('#logoutModal').modal('show');

            var id =$(this).parent().data('id');
            var isDelete=$(this).hasClass('btn-danger')? 0 : 1;

            $('.btn_edit').off().on('click',function(){
                $.ajax({
                    type:'post',
                    url:"/user/updateUser",
                    data:{
                        id:id,
                        isDelete:isDelete
                    },
                    success:function(data){
                            console.log(data);
                             
                            if(data.success){
                                $('#logoutModal').modal('hide');
                                fenye();
                            }
                    }
                })
            })


      })

    })
  
  


