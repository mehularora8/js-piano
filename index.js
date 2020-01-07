const notes = document.querySelectorAll('.note');

//Add event listener to each note to play music
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

//Function to play when melody is replayed
function autoplay(note){
	const sound = document.getElementById(note);
	sound.currentTime = 0;
	sound.play();
	var playkey = note + 'key';
	document.getElementById(playkey).classList.add('pressed');
	sound.addEventListener('ended', () => {
		document.getElementById(playkey).classList.remove('pressed');
	})
}

//Function to let user download a text file of their melody
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

//Wrapper function to autoplay music from created melody
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

//Add event listener to clear button to clear melody 
document.getElementById('clear').addEventListener('click', () => {
	document.getElementById('melody').innerHTML = '';
});

//Add event listener to download to download
document.getElementById('download').addEventListener('click', () => {
	let melody = document.getElementById('melody').innerHTML;
	download(melody);
});

//Add event listener to play button to play 
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

document.addEventListener('keypress', function(e){
	if(e.which == 32){
		console.log('h');
		e.preventDefault();
	}
});



