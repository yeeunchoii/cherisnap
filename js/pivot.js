//피봇 슬라이드 (이미지 슬라이드 할 때 쓸수있어) 마우스나 손으로 터치해서 화면을 넘기는 기술
$.fn.pivot=function(options){
//1.변수선언 2.옵션처리 3.스타일지정(css까지만듦) 4.이벤트 연결(플러그인 동작부분,제일중요)

    //변수선언
    let $target=$(this);
    let $items=$target.children();  //자식들(div를 말하는거임)
    let $container=$target.wrap('<div></div>').parent();
    let option = {
        width:500,
        height:450
    }

    //옵션처리(extend쓰면 사용자가 새로운 width,height를 넣으면 사용자가 넣은값으로 갱신)
    $.extend(option,options)
    //스타일지정
    $target.css({
        width:$items.length*option.width,
        height:option.height,
        position:'absolute'
    });
    $items.css({
        width:option.width,
        height:option.height,
        float:'left'
    });
    $container.css({
        width:option.width,
        height:option.height,
        position:'relative',
        overflow:'hidden'
    });

    //이벤트 연결
    let originLeft=0;
    let oldLeft=0;
    let nowPosition=0;
    let isDown=false;
    $target.on({
        //여러 이벤트 연결
        mousedown:function(event){
            isDown=true;
            oldLeft=originLeft=event.clientX;
            event.preventDefault(); //기본 이벤트 없애기
        },
        mousemove:function(event){
            if(isDown){
                let distance=oldLeft-event.clientX;
                oldLeft=event.clientX;
                $target.animate({
                    left:'-='+distance
                },0);
                $target.stop(true);
            }
            event.preventDefault();
        },
        mouseup:function(event){
            //내부함수선언
            function movePosition(direction){
                //위치설정
                let changePosition=nowPosition+direction;
                if(changePosition>=0 && changePosition < $items.length){
                    nowPosition=changePosition;
                }
            }
            //요소 4분의 1이상 드래그 했을때 경우
            if(originLeft-event.clientX > option.width/4){
                movePosition(+1);
            }else if(originLeft-event.clientX < -option.width/4){
                movePosition(-1);
            }
            $target.animate({
                left:-nowPosition*option.width
            },500);
            isDown=false;
            event.preventDefault();
        }

    });
}