(()=>{
    let scrollHeight = window.innerHeight * 5;

    let objs = {
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
    };

    let canvas = document.querySelector('#canvas-0');
    let context = canvas.getContext('2d');
    let blendCanvas = document.querySelector('#image-blend-canvas');
    let blendContext = blendCanvas.getContext('2d');
    let imgElem1 = new Image();
    imgElem1.src = 'images/front-view-1920.jpg';
    let imgElem2 = new Image();
    imgElem2.src = 'images/chapel-worship2-1920.jpg';
    let imgElem3 = new Image();
    imgElem3.src = 'images/august-mt-1920-1080.jpg';
    let imgElem4 = new Image();
    imgElem4.src = 'images/pond-view-1920-1080.jpg';

    let values = {
        messageA_opacity_in: [0, 1, { start: 0.005, end: 0.07 }],
        messageA_translateY_in: [20, 0, { start: 0.005, end: 0.09 }],

        imgElem2_opacity_in: [0, 1, { start: 0.12, end: 0.2 }],
        messageA_opacity_out: [1, 0, { start: 0.12, end: 0.2 }],
        messageA_translateY_out: [0, -20, { start: 0.12, end: 0.2 }],
        

        messageB_opacity_in: [0, 1, { start: 0.17, end: 0.24 }],
        messageB_translateY_in: [20, 0, { start: 0.17, end: 0.26 }],
        
        imgElem2_opacity_out: [1, 0, { start: 0.3, end: 0.37 }],
        messageB_opacity_out: [1, 0, { start: 0.3, end: 0.37 }],
        messageB_translateY_out: [0, -20, { start: 0.3, end: 0.37 }],


        width_changes: [1080, 1920, { start: 0.34, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.34, end: 0.4 }],
        messageC_translateY_in: [20, 0, { start: 0.34, end: 0.4 }],
        
        canvas_scale: [ 0, 0, { start: 0.46, end: 0.66 } ],
        messageC_opacity_out: [1, 0, { start: 0.48, end: 0.66}],
        messageC_translateY_out: [0, -20, { start: 0.48, end: 0.66}],


        imgElem4_opacity_in: [0, 1, { start: 0.63, end: 0.7 }],
        messageD_opacity_in: [0, 1, { start: 0.72, end: 0.8 }],
        // messageD_translateY_in: [window.innerHeight * 0.5, window.innerHeight * 0.25, { start: 0.6, end: 0.7 }],
    };

    function setLayout() {
        // ????????? ????????? ?????? ??????
        document.querySelector('#scroll-section-0').style.height = `${scrollHeight}px`;
    
    
        if (window.innerWidth < 1000) {
            const heightRatio = window.outerHeight / canvas.height;
            canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        } else {
            canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${850/canvas.height})`;
        }


        const widthRatio = window.innerWidth / blendCanvas.width;
        const heightRatio = window.outerHeight / blendCanvas.height;
        // let canvasScaleRatio;

        if (widthRatio <= heightRatio) {
            // ??????????????? ???????????? ?????? ????????? ??????
            // canvasScaleRatio = heightRatio;
            values.canvas_scale[0] = heightRatio;
        } else {
            // ??????????????? ???????????? ?????? ????????? ??????
            //     canvasScaleRatio = widthRatio;
            values.canvas_scale[0] = widthRatio;
        }

        if (window.innerWidth <= window.outerHeight) {
            // ???????????? ?????? ????????? ??????
            // canvasScaleRatio = heightRatio;
            values.canvas_scale[1] = widthRatio * 4/5;
        } else {
            // ???????????? ?????? ????????? ??????
            //     canvasScaleRatio = widthRatio;
            values.canvas_scale[1] = heightRatio * 3/5;
        }
    }

    function calcValues(values, currentYOffset) {
		let rv;
		// ?????? ???(???????????????)?????? ???????????? ????????? ????????? ?????????
		const scrollRatio = currentYOffset / scrollHeight;

		if (values.length === 3) {
			// start ~ end ????????? ??????????????? ??????
			const partScrollStart = values[2].start * scrollHeight;
			const partScrollEnd = values[2].end * scrollHeight;
			const partScrollHeight = partScrollEnd - partScrollStart;

			if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
				rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
			} else if (currentYOffset < partScrollStart) {
				rv = values[0];
			} else if (currentYOffset > partScrollEnd) {
				rv = values[1];
			}
		} else {
			rv = scrollRatio * (values[1] - values[0]) + values[0];
		}

		return rv;
	}
    
    
    function playTextAnimation(){ 
        let currentYOffset = window.pageYOffset;

        // ?????? CUSCM ?????????
        if (currentYOffset > 20 && currentYOffset < 100) {
            document.querySelector('#scroll-section-0 h1').style.opacity = (100 - currentYOffset) / 100;
        }
        else if (currentYOffset <= 20) {
            document.querySelector('#scroll-section-0 h1').style.opacity = 1;
        }
        else if (currentYOffset >= 100) {
            document.querySelector('#scroll-section-0 h1').style.opacity = 0;
        }

        // main-message a ???????????? ???????????? ???????????????
        if (currentYOffset / scrollHeight <= values.messageA_opacity_in[2].end) {
            // in
            objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
            objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
            // out
            objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
            objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }


        // main-message b ???????????? ???????????? ???????????????
        if (currentYOffset / scrollHeight <= values.messageB_opacity_in[2].end) {
            // in
            objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
            objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
        } else {
            // out
            objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
            objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
        }
        

        // main-message c ???????????? ???????????? ???????????????
        if (currentYOffset / scrollHeight <= values.messageC_opacity_in[2].end) {
            // in
            objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
            objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
        } else {
            // out
            objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
            objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
        }


        // // main-message d ???????????? ???????????????
        if (currentYOffset / scrollHeight <= values.messageD_opacity_in[2].end + 0.4) {
            // in
            objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
            // objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
        }
    }
    

    function playCanvasAnimation() {
        let currentYOffset = window.pageYOffset;

        context.clearRect(0, 0, canvas.width, canvas.height);
        blendContext.clearRect(0, 0, canvas.width, canvas.height);

        // 3?????? ??????.... ????????? 2?????? ???????????? ?????? ???????????? ?????? ???????????? ???????????? ?????? ?????????...
        blendContext.globalAlpha = 1;
        let width_changes = calcValues(values.width_changes, currentYOffset);
        blendContext.drawImage(
            imgElem3, 
            (1920 - width_changes)/2, 0, width_changes, 1080, 
            (1920 - width_changes)/2, 0, width_changes, 1080
        );

        // 1?????? ??????
        if (currentYOffset / scrollHeight <= values.imgElem2_opacity_in[2].end + 0.1)
            context.globalAlpha = 1;
        else
            context.globalAlpha = 0;
        // context.globalAlpha = calcValues(values.imgElem1_opacity_out, currentYOffset);
        context.drawImage(imgElem1, 0, 0);


        //2?????? ??????
        if (currentYOffset / scrollHeight <= values.imgElem2_opacity_in[2].end + 0.1)
            context.globalAlpha = calcValues(values.imgElem2_opacity_in, currentYOffset);
        else
            context.globalAlpha = calcValues(values.imgElem2_opacity_out, currentYOffset);
        
        context.drawImage(imgElem2, 0, 0);


        //4?????? ??????
        if (currentYOffset / scrollHeight > values.imgElem4_opacity_in[2].start) {
            
            blendContext.globalAlpha = calcValues(values.imgElem4_opacity_in, currentYOffset);
            
            blendContext.drawImage(imgElem4, 0, 0);
        }
        else {
            blendContext.globalAlpha = 1;
        }


        // 3~4?????? ??????
        if (currentYOffset / scrollHeight > values.imgElem2_opacity_out[2].start - 0.01) {
            blendCanvas.classList.add('sticky');
            // objs.messageD.classList.add('sticky-elem');
            blendCanvas.style.opacity = 1;

            
            // ?????? ?????? ???????????????
            blendCanvas.style.transform = `translate3d(-50%, -50%, 0) scale(${calcValues(values.canvas_scale, currentYOffset)})`;
            // blendCanvas.style.marginTop = 0;


            // sticky ?????? ??????
            if (currentYOffset / scrollHeight > 0.75) {
                blendCanvas.classList.remove('sticky');
                blendCanvas.style.marginTop = `${scrollHeight * 0.35}px`;

                // objs.messageD.classList.remove('sticky-elem');
            }
            else {
                blendCanvas.style.marginTop = 0;
            }
        }

        // 1~2?????? ????????? ????????? ?????????????????? ????????? (footer??? a?????? ????????? ?????? ??????)
        if (currentYOffset / scrollHeight > values.imgElem2_opacity_out[2].end) {
            canvas.parentElement.style.display = "none";
        }
        else {
            canvas.parentElement.style.display = "block";
        }
    }


    window.addEventListener('load', () => {
        setLayout();
        playTextAnimation();
        playCanvasAnimation();
    });

    window.addEventListener('scroll', ()=>{
        playTextAnimation();
        playCanvasAnimation();
    });

    window.addEventListener('resize', () => {
        setLayout();
        playCanvasAnimation();
    });

})();