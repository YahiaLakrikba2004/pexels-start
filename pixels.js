document.addEventListener('DOMContentLoaded', function () {
  const loadImagesButton = document.getElementById('loadImages')
  const loadSecondaryImagesButton = document.getElementById(
    'loadSecondaryImages'
  )
  const searchButton = document.getElementById('searchButton')
  const searchInput = document.getElementById('searchInput')

  const primaryQueries = [
    'cars',
    'nature',
    'city',
    'animals',
    'food',
    'cows',
    'pumpkins',
    'artists',
    'hats',
    'houseplants',
  ]

  const secondaryQueries = [
    'code',
    'architecture',
    'technology',
    'music',
    'sports',
    'science',
    'celebration',
    'clouds',
    'dark',
    'Beautiful',
  ]

  loadImagesButton.addEventListener('click', function () {
    const query = generateRandomQuery(primaryQueries)
    const primaryUrl = `https://api.pexels.com/v1/search?query=${query}`
    loadImages(primaryUrl)
  })

  loadSecondaryImagesButton.addEventListener('click', function () {
    const query = generateRandomQuery(secondaryQueries)
    const secondaryUrl = `https://api.pexels.com/v1/search?query=${query}`
    loadSecondaryImages(secondaryUrl)
  })

  searchButton.addEventListener('click', function () {
    const searchQuery = searchInput.value.trim()
    if (searchQuery !== '') {
      const searchUrl = `https://api.pexels.com/v1/search?query=${searchQuery}`
      searchImages(searchUrl)
    }
  })

  const storedImages = sessionStorage.getItem('images')
  if (storedImages) {
    displayImages(JSON.parse(storedImages))
  } else {
    const defaultQuery = generateRandomQuery(primaryQueries)
    const defaultUrl = `https://api.pexels.com/v1/search?query=${defaultQuery}`
    loadImages(defaultUrl)
  }

  function generateRandomQuery(queries) {
    return queries[Math.floor(Math.random() * queries.length)]
  }

  function loadImages(url) {
    const Key = 'cjHHjn2fUV7iRovBUwioFg52qhA8JOx4bUqAGj1FqCbmohM6eaKOHmwz'
    fetch(url, { headers: { Authorization: Key } })
      .then(response => response.json())
      .then(data => {
        displayImages(data.photos)
        sessionStorage.setItem('images', JSON.stringify(data.photos))
      })
      .catch(error =>
        console.error('Errore durante il caricamento delle immagini:', error)
      )
  }

  function loadSecondaryImages(url) {
    const Key = 'cjHHjn2fUV7iRovBUwioFg52qhA8JOx4bUqAGj1FqCbmohM6eaKOHmwz'
    fetch(url, { headers: { Authorization: Key } })
      .then(response => response.json())
      .then(data => {
        displayImages(data.photos)
        sessionStorage.setItem('images', JSON.stringify(data.photos))
      })
      .catch(error =>
        console.error(
          'Errore durante il caricamento delle immagini secondarie:',
          error
        )
      )
  }

  function searchImages(url) {
    const Key = 'cjHHjn2fUV7iRovBUwioFg52qhA8JOx4bUqAGj1FqCbmohM6eaKOHmwz'
    fetch(url, { headers: { Authorization: Key } })
      .then(response => response.json())
      .then(data => {
        displayImages(data.photos)
        sessionStorage.setItem('images', JSON.stringify(data.photos))
      })
      .catch(error =>
        console.error('Errore durante la ricerca delle immagini:', error)
      )
  }

  function displayImages(photos) {
    const imagesContainer = document.getElementById('imagesContainer')
    imagesContainer.innerHTML = ''

    photos.forEach(photo => {
      const card = document.createElement('div')
      card.classList.add('col-md-4')

      const cardHtml = `
          <div class="card mb-4 shadow-sm">
            <img src="${photo.src.large}" class="bd-placeholder-img card-img-top" style="width: 100%; height: 200px; object-fit: cover;" />
            <div class="card-body">
              <h5 class="card-title">${photo.photographer}</h5>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button class="btn btn-sm btn-outline-primary view-button" data-image="${photo.src.large}" data-artist="${photo.photographer}">View</button>
                </div>
                <button class="btn btn-sm btn-outline-danger hide-button">Hide</button>
              </div>
            </div>
          </div>
        `

      card.innerHTML = cardHtml
      imagesContainer.appendChild(card)
    })

    const hideButtons = document.querySelectorAll('.hide-button')
    hideButtons.forEach(button => {
      button.addEventListener('click', function () {
        const card = this.closest('.card')
        card.style.display = 'none'
      })
    })

    const viewButtons = document.querySelectorAll('.view-button')
    viewButtons.forEach(button => {
      button.addEventListener('click', function () {
        const imageUrl = this.dataset.image
        const artistName = this.dataset.artist
        sessionStorage.setItem(
          'selectedImage',
          JSON.stringify({ imageUrl, artistName })
        )
        const displayedImages =
          JSON.parse(sessionStorage.getItem('images')) || []
        sessionStorage.setItem(
          'displayedImages',
          JSON.stringify(displayedImages)
        )
        window.location.href = 'detail.html'
      })
    })
  }
})
