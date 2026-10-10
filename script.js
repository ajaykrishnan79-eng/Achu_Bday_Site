const pages=[...document.querySelectorAll('.page')];
function showPage(id){pages.forEach(p=>p.classList.toggle('active',p.id===id));window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.next)));
document.querySelectorAll('[data-prev]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.prev)));
const openLetter=document.getElementById('openLetter'),letter=document.getElementById('letter');
openLetter.addEventListener('click',()=>{const opening=letter.classList.contains('hidden');letter.classList.toggle('hidden',!opening);openLetter.innerHTML=opening?'Close letter <span>×</span>':'Open your letter <span>♡</span>';openLetter.setAttribute('aria-expanded',String(opening));if(opening)letter.scrollIntoView({behavior:'smooth',block:'nearest'});});
const audio=document.getElementById('backgroundMusic'),musicToggle=document.getElementById('musicToggle'),musicLabel=document.getElementById('musicLabel');
audio.addEventListener('error',()=>musicToggle.style.display='none');
musicToggle.addEventListener('click',async()=>{if(audio.paused){try{await audio.play();musicLabel.textContent='Pause music';musicToggle.setAttribute('aria-pressed','true')}catch(e){musicLabel.textContent='Add music.mp3'}}else{audio.pause();musicLabel.textContent='Play music';musicToggle.setAttribute('aria-pressed','false')}});
const petals=document.querySelector('.petals');
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const symbols=['✿','·','❀'];for(let i=0;i<13;i++){let p=document.createElement('span');p.className='petal';p.textContent=symbols[i%3];p.style.left=Math.random()*100+'%';p.style.animationDuration=10+Math.random()*12+'s';p.style.animationDelay=-Math.random()*18+'s';p.style.fontSize=10+Math.random()*13+'px';p.style.setProperty('--drift',(Math.random()*100-50)+'px');petals.appendChild(p)}}
