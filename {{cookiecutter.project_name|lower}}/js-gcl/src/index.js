import { SampleForm, Message } from '../lib/ui.js';

document.addEventListener("DOMContentLoaded", function() {
	const sampleForm = new SampleForm();
	sampleForm.decorate(document.getElementById('sample-form'));

	const $resultSection = document.getElementById('result-section');

	sampleForm.addEventListener('submit', function() {
		const message = new Message(sampleForm.message);
		message.render($resultSection);
	});
});

