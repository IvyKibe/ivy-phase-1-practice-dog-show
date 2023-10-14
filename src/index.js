document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = 'http://localhost:3000';

    // Fetch all dogs from the API and render them in the table
    function fetchAndRenderDogs() {
      fetch(`${BASE_URL}/dogs`)
        .then(response => response.json())
        .then(dogs => {
          const tableBody = document.querySelector('#table-body');
    
          // Clear existing table rows
          tableBody.innerHTML = '';
    
          // Create and append table rows for each dog
          dogs.forEach(dog => {
            const row = createDogRow(dog);
            tableBody.appendChild(row);
          });
        })
        .catch(error => {
          console.error('Error fetching dogs:', error);
        });
    }
    
    // Create a table row for a dog
    function createDogRow(dog) {
      const row = document.createElement('tr');
    
      const nameCell = document.createElement('td');
      nameCell.textContent = dog.name;
      row.appendChild(nameCell);
    
      const breedCell = document.createElement('td');
      breedCell.textContent = dog.breed;
      row.appendChild(breedCell);
    
      const sexCell = document.createElement('td');
      sexCell.textContent = dog.sex;
      row.appendChild(sexCell);
    
      const editCell = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit Dog';
      editButton.addEventListener('click', () => {
        populateForm(dog);
      });
      editCell.appendChild(editButton);
      row.appendChild(editCell);
    
      return row;
    }
    
    // Populate the form with a dog's information
    function populateForm(dog) {
      const form = document.querySelector('#dog-form');
      form.elements['name'].value = dog.name;
      form.elements['breed'].value = dog.breed;
      form.elements['sex'].value = dog.sex;
    }
    
    // Handle form submission
    function handleFormSubmit(event) {
      event.preventDefault();
    
      const form = event.target;
      const id = form.dataset.id;
      const updatedDog = {
        name: form.elements['name'].value,
        breed: form.elements['breed'].value,
        sex: form.elements['sex'].value
      };
    
      // Send PATCH request to update the dog
      fetch(`${BASE_URL}/dogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDog)
      })
        .then(response => response.json())
        .then(() => {
          // Fetch and render all dogs after the update
          fetchAndRenderDogs();
        })
        .catch(error => {
          console.error('Error updating dog:', error);
        });
    }
    
    // Add event listener to the form submission
    const form = document.querySelector('#dog-form');
    form.addEventListener('submit', handleFormSubmit);
    
    // Fetch and render dogs on page load
    document.addEventListener('DOMContentLoaded', () => {
      fetchAndRenderDogs();
    });
    
})