const gallery = document.getElementById('gallery');
const listDivs = document.querySelectorAll('.list');
const formBox = document.querySelector('form');
const searchTermDisplay = document.getElementById('search-term');
const searchBar = document.getElementById('search-bar');
const randomImg = document.getElementById('ranImg');

const fetchAPIdata = async (endpoint) => {
    const API_KEY = '0qSeS2pfsVNs19YwhdV6ari9sbGwCfbtP-Y0gYhJnS8';
    const API_URL = 'https://api.unsplash.com/search/photos?page=1&per_page=30';
  
    const response = await fetch(`${API_URL}&query=${endpoint}&client_id=${API_KEY}`);
    const data = await response.json();
    return data;
  };


formBox.addEventListener('submit', (e) => {
	e.preventDefault();
	const searchTerm = searchBar.value;
	const url = `search.html?query=${encodeURIComponent(searchTerm)}`;
	window.location.href = url;
});

const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('query');

const searchTermCap = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);

fetchAPIdata(searchTerm)
	.then((searchData) => {
        if (searchData.results.length === 0) {
            searchTermDisplay.innerHTML = `No Result found for ${searchTermCap}`;
        } else {
            searchTermDisplay.innerHTML = `Showing Results for ${searchTermCap}`;
        }

		const images = searchData.results.map((photo) => {
			const img = document.createElement('img');
			img.src = photo.urls.regular;
			img.alt = photo.alt_description;
			return img;
		});

		let listIndex = 0;
		images.forEach((img) => {
			listDivs[listIndex].append(img);
			listIndex = (listIndex + 1) % listDivs.length;
		});
	})
	.catch((error) => {
		console.log(error);
	});


    const header = document.querySelector('header');
const swipeThreshold = window.innerHeight * 0.15;

const changeBg = () => {
	if (window.scrollY > swipeThreshold) {
		header.classList.add('background');
	} else {
		header.classList.remove('background');
	}
};
window.addEventListener('scroll', changeBg);