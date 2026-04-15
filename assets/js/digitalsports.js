document.addEventListener('DOMContentLoaded', function () {
	const carousels = document.querySelectorAll('[data-carousel]');

	carousels.forEach(function (carousel) {
		const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
		const track = carousel.querySelector('[data-carousel-track]');
		const prevButton = carousel.querySelector('[data-carousel-prev]');
		const nextButton = carousel.querySelector('[data-carousel-next]');
		const counter = carousel.querySelector('[data-carousel-counter]');

		if (!slides.length || !track || !prevButton || !nextButton) {
			return;
		}

		let currentIndex = 0;

		function updateCarousel() {
			const offset = -currentIndex * 100;
			track.style.transform = `translateX(${offset}%)`;

			slides.forEach(function (slide, index) {
				slide.classList.toggle('is-active', index === currentIndex);
			});

			if (counter) {
				counter.textContent = `${currentIndex + 1} / ${slides.length}`;
			}
		}

		prevButton.addEventListener('click', function () {
			currentIndex = (currentIndex - 1 + slides.length) % slides.length;
			updateCarousel();
		});

		nextButton.addEventListener('click', function () {
			currentIndex = (currentIndex + 1) % slides.length;
			updateCarousel();
		});

		updateCarousel();
	});
});