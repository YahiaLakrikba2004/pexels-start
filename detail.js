//recupero dati dal session storage
document.addEventListener('DOMContentLoaded', function () {
  // Recupera l'immagine selezionata dalla sessionStorage
  const selectedImage = JSON.parse(sessionStorage.getItem('selectedImage'))
  if (selectedImage) {
    const imageDetail = document.getElementById('imageDetail')
    const artistNameElement = document.getElementById('artistName')

    imageDetail.setAttribute('src', selectedImage.imageUrl)
    artistNameElement.textContent = `Artist: ${selectedImage.artistName}`
  } else {
    console.error('Nessuna immagine selezionata')
  }

  // memoria immagini visualizzate nella sessionStorage
  const displayedImages = JSON.parse(sessionStorage.getItem('displayedImages'))
  if (displayedImages) {
    sessionStorage.setItem('images', JSON.stringify(displayedImages))
  }
})

function goBack() {
  window.history.back()
}

//BACKGROUND CARD

document.addEventListener('DOMContentLoaded', function () {
  // Recupera l'immagine selezionata dalla sessionStorage
  const selectedImage = JSON.parse(sessionStorage.getItem('selectedImage'))
  if (selectedImage) {
    const imageUrl = selectedImage.imageUrl

    const tempImage = new Image()
    tempImage.crossOrigin = 'Anonymous'
    tempImage.src = imageUrl
    tempImage.onload = function () {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.width = tempImage.width
      canvas.height = tempImage.height
      context.drawImage(tempImage, 0, 0, tempImage.width, tempImage.height)

      const imageData = context.getImageData(
        0,
        0,
        tempImage.width,
        tempImage.height
      ).data

      // Calcola la media dei colori
      const colorSum = { r: 0, g: 0, b: 0 }
      const pixelCount = imageData.length / 4 // Ogni pixel è rappresentato da 4 valori: RGBA
      for (let i = 0; i < imageData.length; i += 4) {
        colorSum.r += imageData[i]
        colorSum.g += imageData[i + 1]
        colorSum.b += imageData[i + 2]
      }
      const avgColor = {
        r: Math.round(colorSum.r / pixelCount),
        g: Math.round(colorSum.g / pixelCount),
        b: Math.round(colorSum.b / pixelCount),
      }

      document.body.style.backgroundColor = `rgb(${avgColor.r}, ${avgColor.g}, ${avgColor.b})`
    }
  } else {
    console.error('Nessuna immagine selezionata')
  }
})
