(()=>{
    let section1 = document.querySelector('#scroll-section-1');
    let section2 = document.querySelector('#scroll-section-2');
    let section3 = document.querySelector('#scroll-section-3');
    let section4 = document.querySelector('#scroll-section-4');

    // 특정 높이에 도달했을 때 페이드 인 하는 애니메이션
    function playFadeInAnimation(targetElem, startOffset) {
        let currentYOffset = window.pageYOffset;

        if (currentYOffset > startOffset && currentYOffset < startOffset + 400) {
            targetElem.style.opacity = (currentYOffset - startOffset) / 400;
        }
        else if (currentYOffset <= startOffset) {
            targetElem.style.opacity = 0;
        }
        else if (currentYOffset >= startOffset + 400) {
            targetElem.style.opacity = 1;
        }
    }
    
    window.addEventListener('scroll', ()=>{
        playFadeInAnimation(section1, section1.offsetTop-600);
        playFadeInAnimation(section2, section2.offsetTop-600);
        playFadeInAnimation(section3, section3.offsetTop-600);
        // playFadeInAnimation(section4, section4.offsetTop-600);
    });

    window.addEventListener('resize', ()=>{
        playFadeInAnimation(section1, section1.offsetTop-600);
        playFadeInAnimation(section2, section2.offsetTop-600);
        playFadeInAnimation(section3, section3.offsetTop-600);
        // playFadeInAnimation(section4, section4.offsetTop-600);
    });
})();