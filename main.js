
let dist = 0.0, vel = 0.0;
let accel = 0.0, jerk = 0.0, snap = 0.0, crackle = 0.0, pop = 0.0; 
let curtime = 0.0;
let lastLoop = Date.now()

function updateText() {
  document.getElementById("time").innerHTML = "Time: " + curtime.toLocaleString("en-US", { minimumFractionDigits: 3 });  
  document.getElementById("dist").innerHTML = "Distance: " + dist.toLocaleString("en-US", { minimumFractionDigits: 3 });;  
  document.getElementById("vel").innerHTML = "Velocity: " + vel.toLocaleString("en-US", { minimumFractionDigits: 3 });   
  document.getElementById("accel").innerHTML = "Acceleration: " + accel.toLocaleString("en-US", { minimumFractionDigits: 3 });   
  document.getElementById("jerk").innerHTML = "Jerk: " + jerk.toLocaleString("en-US", { minimumFractionDigits: 3 });   
  document.getElementById("snap").innerHTML = "Snap: " + snap.toLocaleString("en-US", { minimumFractionDigits: 3 });   
  document.getElementById("crackle").innerHTML = "Crackle: " + crackle.toLocaleString("en-US", { minimumFractionDigits: 3 });   
  document.getElementById("pop").innerHTML = "Pop: " + pop.toLocaleString("en-US", { minimumFractionDigits: 3 });  
}

function init() {

  lastLoop = Date.now()
  
}

updateText()

function popadd(n){
  pop += n;
  updateText()
}
function accadd(n){
  accel += n;
  updateText()
}
function poppow1(){
  pop *= 1.1;
  updateText()
}

function sleep (ms)
{ return new Promise(r => setTimeout(r, ms)) }

function update(){
  let thisLoop = Date.now();
  let delta = (thisLoop - lastLoop)/1000
  lastLoop = thisLoop

  //console.log(delta)

  curtime = curtime + delta
  dist = dist + vel * delta
  vel = vel + accel * delta
  accel = accel + jerk * delta
  jerk = jerk + snap * delta
  snap = snap + crackle * delta
  crackle = crackle + pop * delta

  updateText()
  
}

async function loop(){
  await init()
  while(true){
    
    await update()
    await sleep(40)
  }
}

function* lerp (v0, v1, t, p = 1e-3)
{ do
  { yield v0
    v0 = (1 - t) * v0 + t * v1
  } while (Math.abs(v1 - v0) > p)
  yield v1
}


async function onSubmit (event)
{ event.preventDefault()
  const f = event.target

  // iterate over lerp generator
  for (const v of lerp(Number(f.from.value), Number(f.to.value), 0.1))
  { f.output.value = v.toFixed(2)
    await sleep(50)
  }
}

document.forms.example.addEventListener("submit", onSubmit)