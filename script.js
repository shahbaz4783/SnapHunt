const formBox = document.querySelector('form');
const searchBar = document.getElementById('search-bar');
const gallery = document.getElementById('gallery');

const fetchAPIdata = async (endpoint) => {
	const API_KEY = '0qSeS2pfsVNs19YwhdV6ari9sbGwCfbtP-Y0gYhJnS8';
	const API_URL = 'https://api.unsplash.com/search/photos?page=1';

	const response = await fetch(`${API_URL}&query=${endpoint}&client_id=${API_KEY}`);
	const data = await response.json();
	return data;
};

formBox.addEventListener('submit', async (e) => {
	e.preventDefault();
	const searchTerm = searchBar.value;
	const searchData = await fetchAPIdata(searchTerm);

	gallery.innerHTML = '';

	searchData.results.forEach((photo) => {
		const img = document.createElement('img');
		img.src = photo.urls.regular;
		img.alt = photo.alt_description;
		gallery.appendChild(img);
	});
});
