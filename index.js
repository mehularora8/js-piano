const notes = document.querySelectorAll('.note');

notes.forEach(note =>{ 
	note.addEventListener('click', () => {
		const sound = document.getElementById(note.dataset.sound);
		document.getElementById('melody').innerHTML += sound.id + ' ';
		sound.currentTime = 0;
		sound.play();
		note.classList.add('pressed');
		sound.addEventListener('ended', () => {
			note.classList.remove('pressed');
		})
	});
});

function autoplay(note){
	const sound = document.getElementById(note);
	sound.currentTime = 0;
	sound.play();
}

function download(text){
	console.log(text);
	var down = document.createElement('a');
    down.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    down.setAttribute('download', "yourMelody.txt");

    down.style.display = 'none';
    document.body.appendChild(down);

    down.click();

    document.body.removeChild(down);
}

function play(text){
	if(text == ""){
		return 0;
	}
		if(text[0] != ' ' && text[1] != ' '){
			autoplay(text[0] + text[1]);
			return 3;
		}
		else{
			autoplay(text[0]);
			return 2;
		}
}

document.getElementById('clear').addEventListener('click', () => {
	document.getElementById('melody').innerHTML = '';
});

document.getElementById('download').addEventListener('click', () => {
	let melody = document.getElementById('melody').innerHTML;
	download(melody);
});

document.getElementById('play').addEventListener('click', () => {
	let melody = document.getElementById('melody').innerHTML;
	let music = setInterval(function(){
		var trim = play(melody);
		if(trim === 0){
			clearInterval(music);
		}
		console.log(melody);
		melody = melody.substr(trim);
	}, 400);
});