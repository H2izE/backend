

const heart = document.querySelector('.heart_btn');//단독실행하면 안됨

heart.addEventListener('click', function () {
    console.log('하트누름 정상작동');
    heart.classList.toggle('on');
});