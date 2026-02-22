const adHtml = `
<div class="fixed-bottom text-center pt-1 darkMode d-flex justify-content-center align-items-center">
  <div class="px-3 text-end" style="min-width:100px">
    개발자<br>
    후원하기
  </div>
  <div class="px-1 donate">
    <div class="coffeeQr">
      <img class="img-fluid rounded" src="default/coffeeQr.png">
    </div>
    <a class="coffeeImg" href="https://aq.gy/f/reSBl" target="_blank">
      <img class="img-fluid" src="default/coffee.png">
    </a>
  </div>
  <div class="px-1 donate">
    <div class="kakaoQr">
      <img class="img-fluid rounded" src="default/kakaopayQr.png">
    </div>
    <a class="kakaoImg" href="https://qr.kakaopay.com/Ej7o3cd74" target="_blank">
      <img class="img-fluid" src="default/kakaopay.png">
    </a>
  </div>
  <div class="px-1 donate">
    <div class="tossQr">
      <img class="img-fluid rounded" src="default/tossQr.png">
    </div>
    <a class="tossImg" href="supertoss://send?amount=0&bank=%EC%9A%B0%EB%A6%AC%EC%9D%80%ED%96%89&accountNo=1002913348842&origin=qr" target="_blank">
      <img class="img-fluid" src="default/toss.png">
    </a>
  </div>
</div>

<style>
.coffeeQr, .kakaoQr, .tossQr {
  position:absolute;
  bottom:0px;
  width:100px;
  opacity:0;
  pointer-events:none;
  transition:all 0.5s ease;
  z-index:100;
}

/* pc의 경우 hover qr 제공 / kakao, toss 링크작동 막음 */
@media (hover: hover) and (pointer: fine) {
  .donate:hover .coffeeQr,
  .donate:hover .kakaoQr,
  .donate:hover .tossQr {
    opacity:1;
    transform:translateX(0) translateY(-50%);
    pointer-events:auto;
  }
  
  .kakaoImg{ pointer-events:none; }
  .tossImg{ pointer-events:none; }
}

.donate a img {
  max-height:40px;
}
</style>
`

adCallback = () => {
  console.log("ad callback test")
}

$("body").append(adHtml)