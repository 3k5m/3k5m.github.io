let derivatives = [];
let curtime, timeSpeed, lastLoop, curstatus;

function updateText() {
  document.getElementById("time").innerHTML = "Time: " + curtime.toLocaleString("en-US", { minimumFractionDigits: 3 });  
  document.getElementById("dist").innerHTML = "Distance: " + derivatives[0].toLocaleString("en-US", { minimumFractionDigits: 3 });;  
  document.getElementById("vel").innerHTML = "Velocity: " + derivatives[1].toLocaleString("en-US", { minimumFractionDigits: 3 });   
  document.getElementById("accel").innerHTML = "Acceleration: " + derivatives[2].toLocaleString("en-US", { minimumFractionDigits: 3 });   
  document.getElementById("jerk").innerHTML = "Jerk: " + derivatives[3].toLocaleString("en-US", { minimumFractionDigits: 3 });   
  document.getElementById("snap").innerHTML = "Snap: " + derivatives[4].toLocaleString("en-US", { minimumFractionDigits: 3 });   
  document.getElementById("crackle").innerHTML = "Crackle: " + derivatives[5].toLocaleString("en-US", { minimumFractionDigits: 3 });   
  document.getElementById("pop").innerHTML = "Pop: " + derivatives[6].toLocaleString("en-US", { minimumFractionDigits: 3 });     
  document.getElementById("timespd").innerHTML = "Speed of Time: " + timeSpeed.toLocaleString("en-US", { minimumFractionDigits: 3 });
  document.getElementById("status").innerHTML = "Status: " + curstatus;
}

function init() {
  // 7 is num of derivatives here
  for(i=0;i<7;i++){
    derivatives[i] = 0.0;
  }
  curtime = 0.0;
  timeSpeed = 1.0;
  lastLoop = Date.now()
  curstatus = "INITIALIZED"
  updateText()
}

init()

function run() {
  lastLoop = Date.now()
  curstatus = "RUNNING"
  updateText()
}
function pause() {
  curstatus = "PAUSED"
  updateText()
}

updateText()

function setvar(v, n){

  //derivative text names
  switch(v){
    case "distance":      v=0; break;
    case "velocity":      v=1; break;
    case "acceleration":  v=2; break;
    case "jerk":          v=3; break;
    case "snap":          v=4; break;
    case "crackle":       v=5; break;
    case "pop":           v=6; break;
  }

  //time and timespd
  if(v == "time"){
    curtime = n;
  }else if(v == "timespeed"){
    timeSpeed = n;
  }else{
    v = Number(v)
  }

  //direct number inputs are taken as nth der
  if(v >= 0 && v <= 6){
    derivatives[v] = n;
  }
  
  //error handling
  else {
    console.log("ERROR");
  }

  updateText()
}

function update(){
  let thisLoop = Date.now();
  let delta = (thisLoop - lastLoop)/1000
  lastLoop = thisLoop

  delta = delta * timeSpeed

  //console.log(delta)

  curtime = curtime + delta
  for(i=0;i<derivatives.length-1;i++){
    derivatives[i] = derivatives[i] + derivatives[i+1] * delta
  }
  updateText()
}

function sleep (ms)
{ return new Promise(r => setTimeout(r, ms)) }

//update every 40ms (25fps, as is standard for most browsers)
async function loop(){
  await run()
  while(curstatus === "RUNNING"){
    await update()
    await sleep(40)
  }
}

function changeVars (event) {
  const e = event.target
  console.log("changevars ran")
  setvar(e.name.value, Number(e.value.value))
}

document.forms.setvariable.addEventListener("submit", changeVars)




//interpolation testing stuff

function* lerp (v0, v1, t, p = 1e-3) {
  do { yield v0
    v0 = (1 - t) * v0 + t * v1
  } while (Math.abs(v1 - v0) > p)
  yield v1
}

async function onSubmit (event) {
  event.preventDefault()
  const f = event.target

  // iterate over lerp generator
  for (const v of lerp(Number(f.from.value), Number(f.to.value), 0.1)){
    f.output.value = v.toFixed(2)
    await sleep(50)
  }
}

document.forms.intertest.addEventListener("submit", onSubmit)