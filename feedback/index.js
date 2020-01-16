function sendFeedback(feedback) {
	const body = {
		message: feedback
	}

	const request = new Request('http://10.177.68.222:5000/reaction/add', {
		method: 'POST',
		body: JSON.stringify(body),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	});

	fetch(request)
    .then(res => console.log(res));
}
