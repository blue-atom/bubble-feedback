const happySmiley = 
`<div class="smiley happy">
<div class="eyes">
	<div class="eye"></div>
	<div class="eye"></div>
</div>
<div class="expression_happy"></div>
</div>`;

const okokSmiley = 
`<div class="smiley okok">
<div class="eyes">
	<div class="eye"></div>
	<div class="eye"></div>
</div>
<div class="expression_okok"></div>
</div>`;

const sadSmiley = 
`<div class="smiley sad">
<div class="eyes">
	<div class="eye"></div>
	<div class="eye"></div>
</div>
<div class="expression_sad"></div>
</div>`;

function callTheStream() {
	var e = new EventSource('http://10.177.68.222:5000/reaction/stream');
	e.onmessage = (msg) => { 
		console.log(msg.data)
		if (msg.data == 'HAPPY') {
			var section = document.getElementById('happy-section');
			var smiley = document.createElement('div');
			smiley.style.width = '16vw';
			smiley.style.height = '16vw';
			smiley.innerHTML = happySmiley;
			section.appendChild(smiley);
			setTimeout(() => {
				section.removeChild(smiley);
			}, 5000);
		} else if (msg.data == 'OKOK') {
			var section = document.getElementById('okok-section');
			var smiley = document.createElement('div');
			smiley.style.width = '16vw';
			smiley.style.height = '16vw';
			smiley.innerHTML = okokSmiley;
			section.appendChild(smiley);
			setTimeout(() => {
				section.removeChild(smiley);
			}, 5000);
		} else if (msg.data == 'SAD') {
			var section = document.getElementById('sad-section');
			var smiley = document.createElement('div');
			smiley.style.width = '16vw';
			smiley.style.height = '16vw';
			smiley.innerHTML = sadSmiley;
			section.appendChild(smiley);
			setTimeout(() => {
				section.removeChild(smiley);
			}, 5000);
		}
	}
}
