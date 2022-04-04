// main.js: 로컬 네비게이션 메뉴 상단에 고정, 로딩 끝났을 때 

(() => {
    

    function checkMenu() {
        let yOffset = window.pageYOffset;

		if (yOffset > 44) {
			document.body.classList.add('global-nav-sticky');
		} 
        else {
			document.body.classList.remove('global-nav-sticky');
		}
	}

    function scrollToChapelSection() {
        let yOffset = window.pageYOffset;
        // window.scrollTo(0, document.querySelector("#scroll-section-1").offsetTop);
        let tempYOffset = yOffset;
        if (tempYOffset < document.querySelector("#scroll-section-1").offsetTop) {
            let siId = setInterval(() => {
                scrollTo(0, tempYOffset);
                tempYOffset += 100;

                if (tempYOffset > document.querySelector("#scroll-section-1").offsetTop + 80) {
                    clearInterval(siId);
                }
            }, 20);
        }
        else {
            let siId2 = setInterval(() => {
                scrollTo(0, tempYOffset);
                tempYOffset -= 100;

                if (tempYOffset < document.querySelector("#scroll-section-1").offsetTop - 80) {
                    clearInterval(siId2);
                }
            }, 20);
        }
    }

    window.addEventListener('scroll', () => {
        checkMenu();
    });

    window.addEventListener('load', () => {
        document.body.classList.remove('before-load');
    });

    document.querySelector('.loading').addEventListener('transitionend', (e) => {
        document.body.removeChild(e.currentTarget);
    });

    document.querySelector(".chapel-link").onclick = scrollToChapelSection;


})();
