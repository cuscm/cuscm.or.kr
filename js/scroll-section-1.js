(()=>{
    let padletElem = document.querySelector('#scroll-section-1 .padlet-embed');
    let boundaryOffset; // 딱 padlet이 완전히 사라지는 yOffset

    function playAnimation() {
        let currentYOffset = window.pageYOffset;

        // padlet 스크롤할 때 사라지는 애니메이션
        if (currentYOffset > boundaryOffset - 400 && currentYOffset < boundaryOffset) {
            padletElem.style.opacity = (boundaryOffset - currentYOffset) / 400;
        }
        else if (currentYOffset <= boundaryOffset - 400) {
            padletElem.style.opacity = 1;
        }
        else if (currentYOffset >= boundaryOffset) {
            padletElem.style.opacity = 0;
        }
        console.log(boundaryOffset);
    }


    window.addEventListener('load', () => {
        boundaryOffset = document.querySelector('#scroll-section-2').offsetTop - 200;
        playAnimation();
    });

    window.addEventListener('scroll', ()=>{
        playAnimation();
    });

    window.addEventListener('resize', ()=>{
        boundaryOffset = document.querySelector('#scroll-section-2').offsetTop - 200;
    });
})();