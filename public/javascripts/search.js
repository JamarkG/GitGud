const searchInput = document.getElementById('searchInput')

const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', (e) => {
    const search = searchInput.value;
    console.log(search);
})
