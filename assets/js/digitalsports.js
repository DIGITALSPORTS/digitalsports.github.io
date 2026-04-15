document.addEventListener('DOMContentLoaded', function () {
	const carousels = document.querySelectorAll('[data-carousel]');

	carousels.forEach(function (carousel) {
		const slides = carousel.querySelectorAll('[data-carousel-slide]');
		const prevButton = carousel.querySelector('[data-carousel-prev]');
		const nextButton = carousel.querySelector('[data-carousel-next]');

		if (!slides.length) {
			return;
		}

		let currentIndex = 0;

		function updateSlides() {
			slides.forEach(function (slide, index) {
				slide.classList.toggle('is-active', index === currentIndex);
			});
		}

		prevButton.addEventListener('click', function () {
			currentIndex = (currentIndex - 1 + slides.length) % slides.length;
			updateSlides();
		});

		nextButton.addEventListener('click', function () {
			currentIndex = (currentIndex + 1) % slides.length;
			updateSlides();
		});

		updateSlides();
	});
});