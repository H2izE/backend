
//const heart = document.querySelector('.heart_btn');//단독실행하면 안됨
const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll(".contents_box .contents");
//SelectorAll을 통해 모든 요소를 가져옴

const delegation = document.querySelector(".contents_box");

// heart.addEventListener('click', function () {
//     console.log('하트누름 정상작동');
//     heart.classList.toggle('on');
// });

function delegationFunc(e) {
    let elem = e.target; //클릭 요소 가져오기
    //console.log(e.target);
    console.log(elem);

    //잘못 클릭함
    while (!elem.getAttribute('data-name')) {
        //elem의 부모를 찾음
        elem = elem.parentNode;
        if (elem.nodeName === 'BODY') {//body까지 이벤트가 없는 경우
            elem = null;
            return;

        }//data-name을 가진 속성을 찾을때까지 부모에게 접근 반복
    }

    if (elem.matches('[data-name="heartbeat"')) {
        //console.log('하트누름');
        let pk = elem.getAttribute('name'); //pk값을 받아옴
        $.ajax({
            Method: 'POST', //에러 시 GET으로 변경
            url: 'data/like.json',
            data: { pk },
            dataType: 'json',  //어떤 데이터로 들어오는지 설정
            success: function (response) {//통신에 성공한 데이터가 response로 들어옴
                let likeCount = document.querySelector('#like-count-37');
                likeCount.innerHTML = '좋아요' + response.like_count + '개';
            },
            error: function (request, status, error) {
                alert('로그인 필요');
                window.location.replace('https://www.naver.com');//임시 에러 웹페이지
            }
        })
    } else if (elem.matches('[data-name="bookmark"')) {
        //console.log('북마크누름');
        let pk = elem.getAttribute('name'); //pk값을 받아옴
        $.ajax({
            Method: 'POST', //에러 시 GET으로 변경
            url: 'data/bookmark.json',
            data: { pk },
            dataType: 'json',  //어떤 데이터로 들어오는지 설정
            success: function (response) {//통신에 성공한 데이터가 response로 들어옴
                let likeCount = document.querySelector('#bookmark-count-37');
                likeCount.innerHTML = '북마크' + response.bookmark_count + '개';
            },
            error: function (request, status, error) {
                alert('로그인 필요');
                window.location.replace('https://www.naver.com');//임시 에러 웹페이지
            }
        })
    } else if (elem.matches('[data-name="comment"')) {
        let content = document.querySelector('#add-comment-post37 > input[type=text]').value;

        console.log(content);
        if (content.length > 140) {
            alert('댓글 최대 140자 입력 가능. 현재 글자수 : ' + content.length);
            return;
        }
        $.ajax({
            Method: 'POST', //에러 시 GET으로 변경
            url: './comment.html',
            data: {
                'pk': 37,
                'content': content
            },
            dataType: 'html',  //어떤 데이터로 들어오는지 설정
            success: function (data) {
                document.querySelector('#comment-list-ajax-post37').insertAdjacentHTML('afterbegin', data);
            },
            error: function (request, status, error) {
                alert('에러 발생-comment');
            }
        })
        document.querySelector("#add-comment-post37 > input[type=text]").value = '';
    } else if (elem.matches('[data-name="comment_delete"')) {
        $.ajax({
            Method: 'POST', //에러 시 GET으로 변경
            url: 'data/delete.json',
            data: {
                'pk': 37
            },
            dataType: 'json',  //어떤 데이터로 들어오는지 설정
            success: function (response) {
                if (response.status) {
                    let comt = document.querySelector('.comment-detail');
                    comt.remove();
                }
            },
            error: function (request, status, error) {
                alert('에러 발생-comment delete');
                window.location.replace('https://www.naver.com');
            }
        })
    } else if (elem.matches('[data-name="follow"')) {
        $.ajax({
            Method: 'POST', //에러 시 GET으로 변경
            url: 'data/follow.json',
            data: {
                'pk': 37
            },
            dataType: 'json',  //어떤 데이터로 들어오는지 설정
            success: function (response) {
                if (response.status) {
                    document.querySelector('input.follow').value = "팔로잉";
                } else {
                    document.querySelector('input.follow').value = "팔로워";
                }
            },
            error: function (request, status, error) {
                alert('에러 발생-comment delete');
                window.location.replace('https://www.naver.com');
            }
        })
    } else if (elem.matches('[data-name="share"')) {
        console.log('공유누름');
    } if (elem.matches('[data-name="more"')) {
        console.log('더보기누름');
    }

    elem.classList.toggle('on'); //on 클래스 주기
}

function resizeFunc() {
    if (pageYOffset >= 10) {
        let calcWidth = (window.innerWidth * 0.5) + 167; //웹페이지 기반 위치 재조정
        sidebox.style.left = calcWidth + 'px';
    }

    if (matchMedia('screen and (max-width : 800px)').matches) {
        //여러 개의 컨텐츠 박스가 있으므로 배열 활용
        for (let i = 0; i < variableWidth.length; i++) {
            variableWidth[i].style.width = window.innerWidth - 20 + 'px';
        }
    } else {
        for (let i = 0; i < variableWidth.length; i++) {
            if (window.innerWidth > 600) //디폴트값이 614이므로 그 이상 커지지 않게 하기 위함
                variableWidth[i].removeAttribute('style');
        }
    }
}

function scrollFunc() {

    var scrollHeight = pageYOffset + window.innerHeight;
    var documentHeight = document.body.scrollHeight;


    // console.log(pageYOffset);

    if (pageYOffset >= 10) {
        header.classList.add('on');


        if (sidebox) {
            sidebox.classList.add('on');
        }

        resizeFunc();


    } else {
        header.classList.remove('on');

        if (sidebox) {
            sidebox.classList.remove('on');
            sidebox.removeAttribute('style');
        }

    }

    console.log('scrollHeight : ' + scrollHeight);
    console.log('documentHeight : ' + documentHeight);

    if (scrollHeight >= documentHeight) {

        var page = document.querySelector('#page').value;

        // page = parseInt(page) + 1;
        // page = parseInt(page) + 1;
        document.querySelector('#page').value = parseInt(page) + 1;
        // $('#page').val(parseInt(page) + 1);

        callMorePostAjax(page);

        if (page > 10) {
            return;
        }

    }

}

function callMorePostAjax(page) {

    if (page > 10) {
        return;
    }

    $.ajax({
        type: 'GET',
        url: "./post.html",
        data: {
            'page': page,
        },
        success: addMorePostAjax,
        dataType: 'html',
        error: function (request, status, error) {
            alert('오류발생');
            // alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        },
    });

}

function addMorePostAjax(data) {

    delegation.insertAdjacentHTML("beforeend", data);
}
setTimeout(function () {
    scrollTo(0, 0);
}, 100); //새로고침하면 화면이 제일 위로 가게 함

if (delegation) {
    delegation.addEventListener('click', delegationFunc);
}


window.addEventListener('resize', resizeFunc);//resize 이벤트 발생 시 resizeFunc 실행
window.addEventListener('scroll', scrollFunc);