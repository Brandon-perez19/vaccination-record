async function editFormHandler(event) {
    console.log('button was clicked');
    event.preventDefault();


    const pet_name = document.querySelector('input[name="pet-name-edit"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(id);
    const response = await fetch(`/api/vaccination/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            pet_name
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText)
    }
}

document.querySelector('.edit-vaccine-form').addEventListener('submit', editFormHandler);