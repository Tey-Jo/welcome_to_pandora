// to avoid Global variable
(() => {


  let yOffset = 0; // for recalculate pageYoffset
  let prevScrollHeight = 0; // Summary scrollheight before current yOffset
  let currentScene = 0; // activated scene
  let enterNewScene = false; // true during switching scene


  const sceneInfo = [{
      //0
      type: 'sticky',
      heightNum: 6, //set as browser height * 6
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
        canvas: document.querySelector('#video-canvas-0'),
        context: document.querySelector('#video-canvas-0').getContext('2d'),
        videoImages: []
      },
      values: {
				videoImageCount: 300,
				imageSequence: [0, 299],
				canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
				messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
				messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
				messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
				messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
				messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
				messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
				messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
				messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
				messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
				messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
				messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
				messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
				messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
				messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
				messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
			}
    },
    { //1
      type: 'normal',
      // heightNum: 6, // no need for normal
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
        content: document.querySelector('#scroll-section-1 .description')
      }
    },
    { //2
      type: 'sticky',
      heightNum: 6, //set as browser height * 6
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
        messageA: document.querySelector('#scroll-section-2 .a'),
        messageB: document.querySelector('#scroll-section-2 .b'),
        messageC: document.querySelector('#scroll-section-2 .c'),
        messageC: document.querySelector('#scroll-section-2 .d'),
        // pinB: document.querySelector('#scroll-section-2 .b .pin'),
        // pinC: document.querySelector('#scroll-section-2 .c .pin'),
        canvas: document.querySelector('#video-canvas-2'),
        context: document.querySelector('#video-canvas-2').getContext('2d'),
        videoImages: []
      },
      values: {
				videoImageCount: 299,
				imageSequence: [0, 298],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
				canvas_opacity_out: [1, 0, { start: 0.9, end: 1 }],
				messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
				messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
				messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
				messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
				messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
				messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
				messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
				messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
				messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
				messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
				messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
				messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
				messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
				messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
				messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
			}
    },
    { //3
      type: 'sticky',
      heightNum: 6, //set as browser height * 6
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
        messageA: document.querySelector('#scroll-section-3 .main-message.a'),
        messageB: document.querySelector('#scroll-section-3 .main-message.b'),
        messageC: document.querySelector('#scroll-section-3 .main-message.c'),
        messageD: document.querySelector('#scroll-section-3 .main-message.d'),
        canvas: document.querySelector('#video-canvas-3'),
        context: document.querySelector('#video-canvas-3').getContext('2d'),
        videoImages: []
      },
      values: {
        videoImageCount: 299,
				imageSequence: [0, 298],
				canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
				canvas_opacity_out: [1, 0, { start: 0.9, end: 1 }],
				messageA_opacity_in2: [0, 1, { start: 0.1, end: 0.2 }],
				messageB_opacity_in2: [0, 1, { start: 0.3, end: 0.4 }],
				messageC_opacity_in2: [0, 1, { start: 0.5, end: 0.6 }],
				messageD_opacity_in2: [0, 1, { start: 0.7, end: 0.8 }],
				messageA_translateY_in2: [20, 0, { start: 0.1, end: 0.2 }],
				messageB_translateY_in2: [20, 0, { start: 0.3, end: 0.4 }],
				messageC_translateY_in2: [20, 0, { start: 0.5, end: 0.6 }],
				messageD_translateY_in2: [20, 0, { start: 0.7, end: 0.8 }],
				messageA_opacity_out2: [1, 0, { start: 0.25, end: 0.3 }],
				messageB_opacity_out2: [1, 0, { start: 0.45, end: 0.5 }],
				messageC_opacity_out2: [1, 0, { start: 0.65, end: 0.7 }],
				messageD_opacity_out2: [1, 0, { start: 0.85, end: 0.9 }],
				messageA_translateY_out2: [0, -20, { start: 0.25, end: 0.3 }],
				messageB_translateY_out2: [0, -20, { start: 0.45, end: 0.5 }],
				messageC_translateY_out2: [0, -20, { start: 0.65, end: 0.7 }],
				messageD_translateY_out2: [0, -20, { start: 0.85, end: 0.9 }]
			}
    },
    { //4
      type: 'sticky',
      heightNum: 6, //set as browser height * 6
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-4'),
        canvasCaption: document.querySelector('.canvas-caption'),
        canvas: document.querySelector('.image-blend-canvas'),
        context: document.querySelector('.image-blend-canvas').getContext('2d')
      }
    }
  ];

  

  function setCanvasImages() {
    let imgElem;
		for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
			imgElem = document.createElement('img');
			imgElem.src = `./images/view/batch_${1 + i}.jpg`;
			sceneInfo[0].objs.videoImages.push(imgElem);
    }
    console.log(sceneInfo[0].objs.videoImages);

    let imgElem2;
    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
      imgElem2 = document.createElement('img');
      imgElem2.src = `./images/bed/batch_${1 + i}.jpg`;
      sceneInfo[2].objs.videoImages.push(imgElem2);
    }
    console.log(sceneInfo[2].objs.videoImages);
    
    let imgElem3;
    for (let i = 0; i < sceneInfo[3].values.videoImageCount; i++) {
      imgElem3 = document.createElement('img');
      imgElem3.src = `./images/end/batch_${1 + i}.jpg`;
      sceneInfo[3].objs.videoImages.push(imgElem3);
    }
    console.log(sceneInfo[3].objs.videoImages);
  }
  setCanvasImages();


  

  
  function setLayout() {
    // set each scroll section height
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === 'normal') {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }


    // for consider refresh page in the middle
    yOffset = window.pageYOffset;

    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);

    // canvas fit as browswer size
    const heightRatio = window.innerHeight / 920;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[3].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }

  function calcValues(values, currentYOffset) {
    let rv;

    // get scroll percentage from current scene

    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;



    if (values.length === 3) {
      // run start~end anymation
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0])+ values[0];
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

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight
    const scrollRatio = currentYOffset / scrollHeight;


    switch (currentScene) {
      // opacity relate to scroll percentage
      case 0:
        // console.log('0 play');
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

        if (scrollRatio <= 0.22) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
      } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
      }

      if (scrollRatio <= 0.42) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
      } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
      }

      if (scrollRatio <= 0.62) {
          // in
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
      } else {
          // out
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
      }

      if (scrollRatio <= 0.82) {
          // in
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
      } else {
          // out
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
      }

      break;

    
      case 2:
        // console.log('2 play');
        let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
        
        // opacity for switching scene
        if (scrollRatio <= 0.5) {
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
        } else {
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset)
        }

        if (scrollRatio <= 0.32) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
      } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
      }

      if (scrollRatio <= 0.67) {
          // in
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
      } else {
          // out
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
      }

      if (scrollRatio <= 0.93) {
          // in
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
      } else {
          // out
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
      }

      break;
        break;
      case 3:

        let sequence3 = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence3], 0, 0);
        
        // opacity switching scene 
        if (scrollRatio <= 0.5) {
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
        } else {
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset)
        }

        if (scrollRatio <= 0.22) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in2, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in2, currentYOffset)}%, 0)`;
      } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out2, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out2, currentYOffset)}%, 0)`;
      }

      if (scrollRatio <= 0.42) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in2, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in2, currentYOffset)}%, 0)`;
      } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out2, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out2, currentYOffset)}%, 0)`;
      }

      if (scrollRatio <= 0.62) {
          // in
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in2, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in2, currentYOffset)}%, 0)`;
      } else {
          // out
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out2, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out2, currentYOffset)}%, 0)`;
      }

      if (scrollRatio <= 0.82) {
          // in
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in2, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in2, currentYOffset)}%, 0)`;
      } else {
          // out
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out2, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out2, currentYOffset)}%, 0)`;
      }

      break;
        
        
      case 4:
        // calculate for 100% width & height 
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerWidth / objs.canvas.height;
        
        let canvasScaleRatio;

        if (widthRatio <= heightRatio) {
          canvasScaleRatio = heightRatio;
          console.log('height 결정')
        } else {
          canvasScaleRatio = widthRatio;
          console.log('width 결정')
        }


        break;
    }
  }

  function scrollLoop() {

    // switch scene up to current yOffset
    prevScrollHeight = 0;
    enterNewScene = false; // prevent minus opacity 

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      enterNewScene = true
      if (currentScene === 0) return; // Safty for browser bounce(current scene stay always >= 0 )
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    if (enterNewScene) return; // moment switching scene

    playAnimation()

  }


  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  window.addEventListener('load', () => {
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
  })
  window.addEventListener('resize', setLayout);
  setLayout();
})();