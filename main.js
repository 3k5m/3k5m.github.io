
let dist = 0.0, vel = 0.0;
let accel = 0.0, jerk = 0.0, snap = 0.0, crackle = 0.0, pop = 0.0; 
let curtime = 0.0;


function init() {
  document.getElementById("time").innerHTML = "Time: " + curtime.toFixed(3);  
  document.getElementById("dist").innerHTML = "Distance: " + dist.toFixed(3);  
  document.getElementById("vel").innerHTML = "Velocity: " + vel.toFixed(3);   
  document.getElementById("accel").innerHTML = "Acceleration: " + accel.toFixed(3);   
  document.getElementById("jerk").innerHTML = "Jerk: " + jerk.toFixed(3);   
  document.getElementById("snap").innerHTML = "Snap: " + snap.toFixed(3);   
  document.getElementById("crackle").innerHTML = "Crackle: " + crackle.toFixed(3);   
  document.getElementById("pop").innerHTML = "Pop: " + pop.toFixed(3);  
}

init()

function pop1(){
  pop += 1.0;
  init()
}

function sleep (ms)
{ return new Promise(r => setTimeout(r, ms)) }


let lastLoop = Date.now()
function update(){
  let thisLoop = Date.now();
  let delta = (thisLoop - lastLoop)/1000
  lastLoop = thisLoop

  curtime = curtime + delta
  dist = dist + vel * delta
  vel = vel + accel * delta
  accel = accel + jerk * delta
  jerk = jerk + snap * delta
  snap = snap + crackle * delta
  crackle = crackle + pop * delta

  document.getElementById("time").innerHTML = "Time: " + curtime.toFixed(3);  
  document.getElementById("dist").innerHTML = "Distance: " + dist.toFixed(3);  
  document.getElementById("vel").innerHTML = "Velocity: " + vel.toFixed(3);   
  document.getElementById("accel").innerHTML = "Acceleration: " + accel.toFixed(3);   
  document.getElementById("jerk").innerHTML = "Jerk: " + jerk.toFixed(3);   
  document.getElementById("snap").innerHTML = "Snap: " + snap.toFixed(3);   
  document.getElementById("crackle").innerHTML = "Crackle: " + crackle.toFixed(3);   
  document.getElementById("pop").innerHTML = "Pop: " + pop.toFixed(3);  
  
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
  for (const v of lerp(Number(f.from.value), Number(f.to.value), 0.33))
  { f.output.value = v.toFixed(2)
    await sleep(50)
  }
}

document.forms.example.addEventListener("submit", onSubmit)