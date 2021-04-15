let score = 0;
const start=()=>{
    location.reload();
};
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 38) {
        let jump = document.querySelector('.hero');
        jump.classList.add('jump');
        setTimeout(() => {
            jump.classList.remove('jump');
        }, 500);
    }
    if (e.keyCode == 39) {
        hero = document.querySelector('.hero');
        let hx = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'));
        hero.style.left = (hx + 422) + 'px';
    }
    if (e.keyCode == 37) {
        hero = document.querySelector('.hero');
        let hx = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'));
        hero.style.left = (hx - 122) + 'px';
    }
});

let check = 1;
//check the collision
var game=setInterval(() => {
    hero = document.querySelector('.hero');
    zombie = document.querySelector('.zombie');

    let hx = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'));
    let hy = parseInt(window.getComputedStyle(hero, null).getPropertyValue('bottom'));
    let zx = parseInt(window.getComputedStyle(zombie, null).getPropertyValue('left'));
    let zy = parseInt(window.getComputedStyle(zombie, null).getPropertyValue('bottom'));

    let ofsetx = Math.abs(hx - zx);
    let ofsety = Math.abs(hy - zy);

    //gameover
    if (ofsetx < 200 && ofsety < 100) {
        zombie.classList.remove('zmove');
        zombie.style.visibility = 'hidden';
        hero.style.visibility='hidden';
        document.querySelector('.gameover').style.visibility='visible';
        document.querySelector('.gameover').classList.add('gameani');
        setTimeout(() => {
            document.querySelector('.playbutton').style.visibility='visible';
        }, 3000);
        stopgame(game);

    }
    else if (zx+200 < hx && check == 1) {
        score += 10;
        document.querySelector('.score').innerHTML = `score: ${score}`;
        document.querySelector('.fill').style.width = score * 5 + 'px';
        check = 0;
    }
    if (zx > hx)
        check = 1;

    //when score is 100
    if (score == 100) {
        hero = document.querySelector('.hero');
        hero.style.background = 'url("fire.png") no-repeat';
        hero.style.width = '300px';
        document.getElementById('text').innerHTML='Shoooot..';
    }
}, 1);

const stopgame=(e)=>{
    clearInterval(e);
}

window.addEventListener('keydown',(e)=>{
    if (e.keyCode == 13 && score==100) {
        shell = document.querySelector('.shell');
        zombie = document.querySelector('.zombie');
        hero = document.querySelector('.hero');
        shell.style.left=(parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'))+250)+'px';
        shell.style.visibility = 'visible';
        shell.classList.add('shellmove');

        var win=setInterval(() => {
            zx=parseInt(window.getComputedStyle(zombie, null).getPropertyValue('left'));
            sx=parseInt(window.getComputedStyle(shell, null).getPropertyValue('left'));
            if(Math.abs(zx-sx)<100)
            {
                shell.style.visibility = 'hidden';
                zombie.classList.remove('zmove');
                zombie.style.left=zx+'px';
                zombie.style.background='url("dead.gif") no-repeat';
                youwin();
                stopgame(win);
            }

        }, 1);
    }
})

const youwin=()=>{
    document.querySelector('.gameover').style.background='url("winner.png") no-repeat';
    document.querySelector('.gameover').style.backgroundSize='contain';
    setTimeout(() => {
        zombie.style.visibility = 'hidden';
        
    }, 5100);
    document.querySelector('.gameover').style.visibility='visible';
    document.querySelector('.gameover').classList.add('gameani');
    setTimeout(() => {
        document.querySelector('.playbutton').style.visibility='visible';
        document.querySelector('.playbutton').style.backgroundColor='rgb(199, 18, 18)';
    }, 3000);
}