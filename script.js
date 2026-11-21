/* =====================================================
   CONFIGURACIÓN: aquí cambias todo
   ===================================================== */
const START_DATE = new Date(2023, 10, 21);   // 21 nov 2023 (mes 10 = noviembre)
const ANNIVERSARY = new Date(2026, 10, 21);  // 3 años
const CODE = '21112023';                     // clave: DDMMAAAA

/* FOTOS: pon tus imágenes en la carpeta  fotos/  con estos nombres.
   Puedes cambiar nombres y textos, y agregar o quitar líneas. */
const PHOTOS = [
  {src:'fotos/foto1.jpeg', cap:'Cómo empezó todo'},
  {src:'fotos/foto2.jpeg', cap:'Nuestra primera salida'},
  {src:'fotos/foto3.jpeg', cap:'Tú y yo'},
  {src:'fotos/foto4.jpeg', cap:'Ese día'},
  {src:'fotos/foto5.jpeg', cap:'Mi favorita'},
  {src:'fotos/foto6.jpeg', cap:'Siempre contigo'},
  {src:'fotos/foto7.jpeg', cap:'Risas'},
  {src:'fotos/foto8.jpeg', cap:'Lo que viene'}
];

/* CARTA: escribe lo que quieras (los saltos de línea se respetan) */
const LETTER =
`Mi Adoración preciosa,

Ya hoy son 3 años desde que inicio nuestro pequeño revuelto de amor.

Compartir risas, abrazos, besos, sufridas, enfermedades, chilladas y  experiencias inolvidables a tu lado.

Quiero agradecerte por hacer especial todos estos dias juntos, tanto los normales como los significativos,
agradezco tanto al mundo por juntarnos y atravezarnos locamente, pues esto es como siempre te lo he dicho
"me gane la loteria sin jugarla", eres lo mas especial que tengo en mi vida y agradezco de ser lo mismo para ti
pues tu amor me llena de vida y alegria, nada mas podria pedir. Pues el simple hecho de tenerte es un privilegio 
en la vida. Quiero decirte que estoy muy feliz de compartir con alguien tan inteligente, generosa, amable, grandiosa,
bella, persistente, amo tu manera de ser tal como es y seguire haciendolo, pues es lo que me enamoro y  aun me emboba
, como te he dicho admiro tu caracter y la persona que eres mi vida, y quiero que sepas que estoy muy orgulloso de ti,
mi psicologa hermosa, quiero verte terminar tu carrera asi como te vi empezarla y hacer lo que te gusta, como clinica.

Te amo mi mayor privilegio en la vida

Te amo de aqui hasta que odies la psicologia😝

Att: Tu paciente, admirador, fan, enamorado, apoyo, estres, alimentador, transportador, chofer, etc etc

3❤️`;

/* CANCIÓN: pega el link de YouTube (el normal, el corto youtu.be o el de la app) */
const SONG = {
  title:'Llego la reina', artist:'Silvestre Dangond',
  youtube:'https://www.youtube.com/watch?v=BhnHqYuzm7I',
  note:'Tu eres la reina de mi vida mi amor precioso'
};
const HINTS = ['Ups, se resbaló 🙈','Casi 😏','Jeje, inténtalo otra vez','Ese botón no quiere ser tocado',
  'Mejor dile que sí 💕','Sabes que quieres decir que sí','Cada vez más rápido ⚡'];
/* ===================================================== */

const $=id=>document.getElementById(id);
function go(id){document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));
  $(id).classList.remove('hidden');$(id).scrollTop=0;burst(innerWidth/2,innerHeight/2,16);
  if(id==='s3')startCounter();if(id==='s4')buildCollage();if(id==='s5')typeLetter();if(id==='s6')buildSong();}
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.next)));

/* corazones de fondo */
const EM=['💗','💕','💖','🌸','🤍','❤️','💘','🌷'];
for(let i=0;i<45;i++){const s=document.createElement('span');s.textContent=EM[i%EM.length];
  s.style.left=Math.random()*100+'%';s.style.fontSize=(14+Math.random()*30)+'px';s.style.opacity=.35+Math.random()*.5;
  s.style.animationDuration=(6+Math.random()*9)+'s';s.style.animationDelay=(-Math.random()*14)+'s';$('fx').appendChild(s);}
function burst(x,y,n=8){for(let i=0;i<n;i++){const p=document.createElement('span');p.className='pop';p.textContent=EM[Math.floor(Math.random()*EM.length)];
  p.style.left=x+'px';p.style.top=y+'px';const a=Math.random()*6.28,d=40+Math.random()*90;
  p.style.setProperty('--dx',Math.cos(a)*d+'px');p.style.setProperty('--dy',Math.sin(a)*d-40+'px');p.style.setProperty('--r',(Math.random()*120-60)+'deg');
  document.body.appendChild(p);setTimeout(()=>p.remove(),900);}}
document.addEventListener('pointerdown',e=>burst(e.clientX,e.clientY,7));

/* 1. botón No que huye */
const yes=$('yes'),no=$('no');let dodges=0,scale=1;
function dodge(e){if(e){e.preventDefault();e.stopPropagation();}
  if(no.parentNode!==document.body)document.body.appendChild(no); // fuera de la tarjeta para moverse por toda la pantalla
  const pad=12,nw=no.offsetWidth,nh=no.offsetHeight,y=yes.getBoundingClientRect();let x,t,k=0,ov;
  do{x=pad+Math.random()*(innerWidth-nw-pad*2);t=pad+Math.random()*(innerHeight-nh-pad*2);k++;
    ov=x<y.right+20&&x+nw>y.left-20&&t<y.bottom+20&&t+nh>y.top-20;}while(ov&&k<40);
  Object.assign(no.style,{position:'fixed',left:x+'px',top:t+'px',zIndex:40});
  $('hint').textContent=HINTS[Math.min(dodges++,HINTS.length-1)];
  scale=Math.min(scale+.08,1.6);yes.style.transform='scale('+scale+')';if(navigator.vibrate)navigator.vibrate(15);}
['pointerdown','touchstart','mouseenter','click','focus'].forEach(ev=>no.addEventListener(ev,dodge,{passive:false}));
document.addEventListener('pointermove',e=>{if(!dodges||no.style.display==='none')return;const r=no.getBoundingClientRect();
  if(Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2))<70)dodge();});
yes.addEventListener('click',()=>{no.style.display='none';burst(innerWidth/2,innerHeight/2,30);go('s2');});

/* 2. candado */
let entered='';const dots=$('dots'),pad=$('pad');
dots.innerHTML=CODE.split('').map(()=>'<i></i>').join('');
['1','2','3','4','5','6','7','8','9','C','0','⌫'].forEach(k=>{const b=document.createElement('button');b.textContent=k;
  b.onclick=()=>{if(k==='C')entered='';else if(k==='⌫')entered=entered.slice(0,-1);else if(entered.length<CODE.length)entered+=k;
    [...dots.children].forEach((d,i)=>d.classList.toggle('on',i<entered.length));
    if(entered.length===CODE.length)setTimeout(check,200);};pad.appendChild(b);});
function check(){if(entered===CODE){$('lockmsg').textContent='💖 Esa es nuestra fecha 💖';burst(innerWidth/2,innerHeight/2,40);setTimeout(()=>go('s3'),900);}
  else{$('lockmsg').textContent='Esa no es nuestra fecha 🥺 intenta otra vez';const c=$('s2').firstElementChild;c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake');
    entered='';[...dots.children].forEach(d=>d.classList.remove('on'));if(navigator.vibrate)navigator.vibrate(200);}}

/* 3. contador */
let timer;
function startCounter(){clearInterval(timer);timer=setInterval(tick,1000);tick();}
function tick(){const a=START_DATE,b=new Date();
  let y=b.getFullYear()-a.getFullYear(),m=b.getMonth()-a.getMonth(),d=b.getDate()-a.getDate(),h=b.getHours(),mi=b.getMinutes(),s=b.getSeconds();
  if(d<0){d+=new Date(b.getFullYear(),b.getMonth(),0).getDate();m--;}if(m<0){m+=12;y--;}
  $('counter').innerHTML=[[y,'años'],[m,'meses'],[d,'días'],[h,'horas'],[mi,'min'],[s,'seg']].map(([v,l])=>`<div><b>${v}</b><small>${l}</small></div>`).join('');
  const total=Math.floor((b-a)/864e5),left=Math.ceil((ANNIVERSARY-b)/864e5);
  $('countmsg').textContent=left>0?`${total} días juntos · faltan ${left} para nuestros 3 años 💞`:`${total} días juntos · ¡Feliz aniversario número 3! 🎉`;}

/* 4. collage */
function buildCollage(){const c=$('collage');if(c.children.length)return;
  PHOTOS.forEach((p,i)=>{const d=document.createElement('div');d.className='pol';
    d.style.setProperty('--r',(Math.random()*10-5)+'deg');d.style.setProperty('--d',(i*.15)+'s');
    const img=new Image();img.src=p.src;img.alt=p.cap;
    img.onerror=()=>{const ph=document.createElement('div');ph.className='ph';ph.textContent='💗';img.replaceWith(ph);};
    d.appendChild(img);const cap=document.createElement('p');cap.textContent=p.cap;d.appendChild(cap);
    d.onclick=()=>{if(img.parentNode){$('lbimg').src=p.src;$('lb').style.display='flex';}};c.appendChild(d);});}
$('lb').onclick=()=>$('lb').style.display='none';

/* 5. carta con efecto máquina de escribir */
let typed=false,ti;
function typeLetter(){if(typed)return;typed=true;const el=$('letter');let i=0;
  const end=()=>{clearInterval(ti);el.textContent=LETTER;el.classList.add('done');$('toSong').style.display='inline-block';};
  ti=setInterval(()=>{el.textContent=LETTER.slice(0,++i);if(i>=LETTER.length)end();},35);el.onclick=end;}

/* 6. canción (YouTube) */
function ytId(u){const m=u.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);return m?m[1]:u;}
function buildSong(){$('songTitle').textContent=SONG.title;$('songArtist').textContent=SONG.artist;$('songNote').textContent=SONG.note;
  const box=$('player');if(box.children.length)return;
  box.innerHTML=`<iframe class="yt" src="https://www.youtube.com/embed/${ytId(SONG.youtube)}?playsinline=1&rel=0" title="Canción" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
  <a class="ytlink" href="${SONG.youtube}" target="_blank" rel="noopener">Si no carga, ábrela en YouTube ▶</a>`;}
