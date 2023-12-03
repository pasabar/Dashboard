const getTokenFromCookies = (cookieName) => {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === cookieName) {
      return value
    }
  }
  return null
}

const getCatalogData = async () => {
  const targetURL = 'https://asia-southeast2-pasabar.cloudfunctions.net/GetAll-dataCatalog' // Replace with your actual API endpoint

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
  }

  try {
    const response = await fetch(targetURL, requestOptions)
    const data = await response.json()

    if (data.status === true) {
      displayCatalogData(data.data, 'catalogDataBody')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.message,
      })
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

// Displaying data in the table
const displayCatalogData = (catalogData, tableBodyId) => {
  const catalogdataBody = document.getElementById(tableBodyId)

  catalogdataBody.innerHTML = ''

  if (catalogData && catalogData.length > 0) {
    catalogData.forEach((catalog) => {
      const newRow = document.createElement('tr')
      newRow.innerHTML = `
        <td class="px-4 py-3">
          <div class="flex items-center text-sm">
            <div>
              <p class="font-semibold">${catalog.nomorid}</p>
            </div>
          </div>
        </td>
        <td class="px-4 py-3 text-sm">
          <p class="font-semibold">${catalog.title}</p>
        </td>
        <td class="px-4 py-3 text-sm">
          <p class="font-semibold">${catalog.description}</p>
        </td>
        <td class="px-4 py-3 text-sm">
          <img src="${catalog.image}" alt="Catalog Image" class="max-w-full h-auto">
        </td>
        <td class="px-4 py-3 text-xs">
          <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
            ${catalog.status}
          </span>
        </td>
        <td class="px-4 py-3">
          <a href="#" class="edit-link" data-catalogid="${catalog.nomorid}">Edit</a>
          <a href="#" class="delete-link" data-catalogid="${catalog.nomorid}">Delete</a>
        </td>
      `

      catalogBody.appendChild(newRow)
    })
  } else {
    catalogBody.innerHTML = `<tr><td colspan="6">No catalog data found.</td></tr>`
  }
}

// Initial fetch of catalog data
getCatalogData()
