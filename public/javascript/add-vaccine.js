function format_date(date) {
    return `${new Date(date).getMonth() + 1}${new Date(date).getDate()}${new Date(date).getFullYear()}`;
}

async function newFormHandler(event) {
    console.log("button clicked")
    event.preventDefault();

    const pet_name = document.querySelector('input[name="pets-name"]').value.trim();
    console.log(pet_name)

    const vaccine = document.querySelector('input[name="vaccines"]').value.trim();
    console.log(vaccine)

    const pet_species = document.querySelector('input[name="pet-species"]:checked').value;
    console.log(pet_species)

    const vaccination_date = document.querySelector('input[name="vaccine-date"]').value.trim();

    const response = await fetch(`/api/vaccination/`, {
        method: 'POST',
        body: JSON.stringify({
            pet_name,
            pet_species,
            vaccine,
            vaccination_date
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);