function init() {
  document.getElementById("startbtn").innerHTML = "initializing...";
}

var dist, vel, accel, jerk, snap, crackle, pop; 
var time;
function pop1(){
  while(true){
    document.getElementById("time").innerHTML = "Time: " + time;  
    document.getElementById("dist").innerHTML = "Distance: " + dist;  
    document.getElementById("vel").innerHTML = "Velocity: " + vel;  
    document.getElementById("accel").innerHTML = "Acceleration: " + accel;  
    document.getElementById("jerk").innerHTML = "Jerk: " + jerk;  
    document.getElementById("snap").innerHTML = "Snap: " + snap;  
    document.getElementById("crackle").innerHTML = "Crackle: " + crackle; 
    document.getElementById("pop").innerHTML = "Pop: " + pop;  
  }
}

let money;
let target;

// initialize
function start ()
{ money = document.forms.example.money
  target = document.forms.example.target
}

// each frame
function update (delta)
{ const next = lerp(Number(money.value), Number(target.value), delta/1e2)
  money.value = next.toFixed(2)
}

// helpers
function lerp (v0, v1, t, p = 1e-3)
{ const next = (1 - t) * v0 + t * v1
  if (Math.abs(v1 - next) < p)
    return v1
  else
    return next
}

function sleep (ms)
{ return new Promise(r => setTimeout(r, ms)) }

function time ()
{ let now = Date.now()
  let last
  return _ =>
  { last = now
    now = Date.now()
    return now - last
  }
}

async function loop ()
{ const deltaTime = time()
  await start()               // call `start` to initialize
  while (true)
  { await update(deltaTime()) // call `update` each frame
    await sleep(50)
  }
}

// run the game
loop()
