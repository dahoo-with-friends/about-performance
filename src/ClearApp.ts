


function long() {
  var observer = new PerformanceObserver(function (list) {
    var perfEntries = list.getEntries();
    for (var i = 0; i < perfEntries.length; i++) {
      // Process long task notifications:
      // report back for analytics and monitoring
      // ...
      console.log(perfEntries[i])
    }
  });
  // register observer for long task notifications
  observer.observe({ entryTypes: ["longtask"] });
}


var longArray = new Array(10000).fill('ufo')
var longArray2 = longArray.map((item, index) => {
  return index + '----------'
})

long()

function onHandle(e) {
  console.log(e)
}


window.onHandle = onHandle

var rtn = longArray2.map((item, index) => {
  return `<div class="list" onclick="onHandle">${item}</div>`
})

window.onload = function () {
  var rootDiv = document.getElementById("root");
  if (rootDiv) {
    rootDiv.onclick = function (ev:any) {
      var ev = ev || window.event;
      var target = ev.target;
      if (target?.nodeName?.toLowerCase() == 'li') { 
        console.log(target.innerHTML); 
      }
    }
  }
}

document.querySelectorAll('#root')[0].innerHTML = rtn.join('\n')

export { }