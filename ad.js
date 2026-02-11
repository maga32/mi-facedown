const adHtml = `
<div class="fixed-bottom text-center pt-1 darkMode">
  <img src="https://loremflickr.com/320/50">
</div>
`

adCallback = () => {
  console.log("ad callback test")
}

$("body").append(adHtml)