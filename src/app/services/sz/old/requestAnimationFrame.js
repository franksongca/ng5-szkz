/**
 * Created by franks on 2017-11-24.
 */
window.requestAnimationFrame = window.requestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(f){return setTimeout(f, 1000/60)} // simulate calling code 60

window.cancelAnimationFrame = window.cancelAnimationFrame
  || window.mozCancelAnimationFrame
  || function(requestID){clearTimeout(requestID)} //fall back






//Animation over time in requestAnimationFrame()
//
//So it's simple enough to repeatedly call an animation function using requestAnimationFrame(), but most animations are much more finicky, having to stop at some point after a certain objective has been achieved over a certain amount of time. Take our example of moving the DIV above; in a real life scenario, what we probably want to do is move the DIV 400 pixels to the right over a time of say 2 seconds. To do this with requestAnimationFrame(), we can take advantage of the timestamp parameter that's passed into the callback function. Lets see how this works now, by retooling our DIV moving code above so it moves the DIV a certain distance over a certain amount of time:
var adiv = document.getElementById('mydiv')
var starttime

function moveit(timestamp, el, dist, duration){
  //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
  var timestamp = timestamp || new Date().getTime()
  var runtime = timestamp - starttime
  var progress = runtime / duration
  progress = Math.min(progress, 1)
  el.style.left = (dist * progress).toFixed(2) + 'px'
  if (runtime < duration){ // if duration not met yet
    requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
      moveit(timestamp, el, dist, duration)
    })
  }
}

requestAnimationFrame(function(timestamp){
  starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
  moveit(timestamp, adiv, 400, 2000) // 400px over 1 second
})


//Cancelling requestAnimationFrame()
//
//Just like with setTimeout/ setInterval, you can cancel a requestAnimationFrame call, and in identical fashion as well. requestAnimationFrame when called returns a non 0 integer that can be captured inside a variable and passed into its nemesis counterpart cancelAnimationFrame() to stop it from being invoked again. The following logs the timestamp parameter value of requestAnimationFrame for two seconds,  using cancelAnimationFrame to stop the former:

var reqanimationreference

function logtimestamp(timestamp){
  console.log(timestamp)
  reqanimationreference = requestAnimationFrame(logtimestamp)
}

requestAnimationFrame(logtimestamp)

setTimeout(function(){ // cancel requestAnimationFrame after 2 seconds
  cancelAnimationFrame(reqanimationreference)
}, 2000)
