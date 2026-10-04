const workouts=[
{day:'SESSION 1',name:'Full Body A',ex:[['Leg Press','3','8–12','Quads • Glutes','2–3 min'],['Machine Chest Press','3','8–12','Chest • Triceps','2 min'],['Lat Pulldown','3','8–12','Back • Biceps','2 min'],['Seated Leg Curl','2','10–15','Hamstrings','90 sec'],['Dumbbell Lateral Raise','2','12–15','Shoulders','60–90 sec'],['Cable Biceps Curl','2','10–15','Biceps','60–90 sec'],['Plank','2','30–60 sec','Core','60 sec']]},
{day:'SESSION 2',name:'Full Body B',ex:[['Goblet Squat','3','8–12','Legs • Glutes','2–3 min'],['Seated Cable Row','3','8–12','Back • Biceps','2 min'],['Incline Dumbbell Press','3','8–12','Upper chest • Triceps','2 min'],['Romanian Deadlift','2','8–12','Hamstrings • Glutes','2–3 min'],['Machine Shoulder Press','2','8–12','Shoulders','2 min'],['Cable Triceps Pushdown','2','10–15','Triceps','60–90 sec'],['Cable Crunch','2','10–15','Abs','60–90 sec']]},
{day:'SESSION 3',name:'Full Body C',ex:[['Hack Squat / Leg Press','3','8–12','Legs','2–3 min'],['Chest-Supported Row','3','8–12','Back','2 min'],['Machine Chest Press','3','8–12','Chest','2 min'],['Leg Curl','2','10–15','Hamstrings','90 sec'],['Lat Pulldown','2','8–12','Back • Biceps','2 min'],['Dumbbell Lateral Raise','2','12–15','Shoulders','60–90 sec'],['Dumbbell Biceps Curl','2','10–15','Biceps','60–90 sec'],['Triceps Pushdown','2','10–15','Triceps','60–90 sec']]}
];

const exerciseDemos={
'Leg Press':'glutes/sled-45-leg-press.gif',
'Machine Chest Press':'pectorals/lever-chest-press.gif',
'Lat Pulldown':'lats/cable-lat-pulldown-full-range-of-motion.gif',
'Seated Leg Curl':'hamstrings/lever-seated-leg-curl.gif',
'Dumbbell Lateral Raise':'delts/dumbbell-lateral-raise.gif',
'Cable Biceps Curl':'biceps/cable-curl.gif',
'Plank':'abs/front-plank-with-twist.gif',
'Goblet Squat':'quads/dumbbell-goblet-squat.gif',
'Seated Cable Row':'lats/cable-seated-high-row-v-bar.gif',
'Incline Dumbbell Press':'pectorals/dumbbell-incline-bench-press.gif',
'Romanian Deadlift':'glutes/dumbbell-romanian-deadlift.gif',
'Machine Shoulder Press':'delts/lever-shoulder-press.gif',
'Cable Triceps Pushdown':'triceps/cable-pushdown.gif',
'Cable Crunch':'abs/cable-kneeling-crunch.gif',
'Hack Squat / Leg Press':'glutes/sled-hack-squat.gif',
'Chest-Supported Row':'upper-back/dumbbell-incline-row.gif',
'Leg Curl':'hamstrings/lever-seated-leg-curl.gif',
'Dumbbell Biceps Curl':'biceps/dumbbell-biceps-curl.gif',
'Triceps Pushdown':'triceps/cable-pushdown.gif'};
const GIF_BASE='https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/';
function demoFor(name){return exerciseDemos[name]||''}
function demoSrc(name){const f=demoFor(name);return f?GIF_BASE+f:'assets/exercises/generic.svg'}

let state=JSON.parse(localStorage.getItem('zakariaFit')||'{"completed":[],"sets":{},"totalWorkouts":0,"totalSets":0}');let current=0,timerInt,timerSec=90;
const save=()=>localStorage.setItem('zakariaFit',JSON.stringify(state));
function go(id){document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));document.getElementById(id).classList.add('active');document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('active',x.dataset.go===id));scrollTo(0,0);if(id==='progress')stats()}
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
function home(){document.getElementById('sessionCards').innerHTML=workouts.map((w,i)=>`<div class="session ${state.completed.includes(i)?'done':''}" onclick="openWorkout(${i})"><div class="sessionTop"><span class="day">${w.day}</span><span class="badge">${w.ex.length} exercises</span></div><h3>${w.name} ${state.completed.includes(i)?'✓':''}</h3><p>Full body • ~60–75 min</p></div>`).join('');document.getElementById('doneCount').textContent=state.completed.length}
window.openWorkout=function(i){current=i;let w=workouts[i];document.getElementById('workoutHead').innerHTML=`<div class="workoutTitle"><span class="eyebrow">${w.day}</span><h2>${w.name}</h2><p class="muted">Tap ✓ after each set. Weight and reps are saved automatically.</p></div>`;document.getElementById('exerciseList').innerHTML=w.ex.map((e,ei)=>`<div class="exercise"><div class="exHead"><div><span class="exNo">EXERCISE ${ei+1}</span><h3>${e[0]}</h3><p>${e[3]} • Rest ${e[4]}</p></div><span class="badge">${e[1]} × ${e[2]}</span></div><div class="demoWrap"><img class="exerciseDemo" src="${demoSrc(e[0])}" alt="Animated demonstration of ${e[0]}"><span>Movement demo • repeat smoothly</span></div><div class="sets">${Array.from({length:+e[1]},(_,si)=>setRow(i,ei,si,e[2])).join('')}</div></div>`).join('')+`<button class="finish" onclick="finishWorkout()">FINISH WORKOUT</button>`;bindInputs();go('workout')}
function setRow(w,e,s,reps){let k=`${w}-${e}-${s}`,d=state.sets[k]||{};return `<div class="setrow"><span>#${s+1}</span><input data-k="${k}" data-f="kg" inputmode="decimal" placeholder="kg" value="${d.kg||''}"><input data-k="${k}" data-f="reps" inputmode="numeric" placeholder="${reps}" value="${d.reps||''}"><button class="check ${d.done?'checked':''}" data-check="${k}">✓</button></div>`}
function bindInputs(){document.querySelectorAll('input[data-k]').forEach(x=>x.onchange=()=>{state.sets[x.dataset.k]=state.sets[x.dataset.k]||{};state.sets[x.dataset.k][x.dataset.f]=x.value;save()});document.querySelectorAll('[data-check]').forEach(b=>b.onclick=()=>{let k=b.dataset.check;state.sets[k]=state.sets[k]||{};let was=!!state.sets[k].done;state.sets[k].done=!was;state.totalSets=Math.max(0,(state.totalSets||0)+(was?-1:1));b.classList.toggle('checked');save();if(!was)startTimer()})}
window.finishWorkout=function(){if(!state.completed.includes(current)){state.completed.push(current);state.totalWorkouts=(state.totalWorkouts||0)+1}save();home();go('home')}
function stats(){document.getElementById('totalWorkouts').textContent=state.totalWorkouts||0;document.getElementById('totalSets').textContent=state.totalSets||0}
function startTimer(){timerSec=90;document.getElementById('restModal').classList.add('show');clearInterval(timerInt);drawTimer();timerInt=setInterval(()=>{timerSec--;drawTimer();if(timerSec<=0){clearInterval(timerInt);document.getElementById('restModal').classList.remove('show')}},1000)}function drawTimer(){let m=Math.floor(timerSec/60),s=timerSec%60;document.getElementById('timer').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`}
document.getElementById('stop').onclick=()=>{clearInterval(timerInt);document.getElementById('restModal').classList.remove('show')};document.getElementById('plus').onclick=()=>{timerSec+=30;drawTimer()};document.getElementById('minus').onclick=()=>{timerSec=Math.max(0,timerSec-30);drawTimer()};document.getElementById('resetBtn').onclick=()=>{if(confirm('Reset all workout progress?')){localStorage.removeItem('zakariaFit');location.reload()}};home();stats();
