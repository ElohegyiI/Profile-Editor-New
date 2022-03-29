const formComponent = `
    <section>
        <form id='form'>
            <h1>Profile Editor</h1>

            <input type="text" name='firstname'     placeholder="Firstname"><br>

            <input type="text" name='surname' placeholder="Surname"><br>

            <input type="text" name='address' placeholder="Address"><br>

            <input type="text" name='zip' placeholder="Zip or   postalcode"><br>

            <div class="area-image">
                <textarea id="introduction" name="introduction"         placeholder="Introduction" 	maxlength="300" required></textarea><br>

            <img src="" alt="profile image"></img>
        </div>
        <div class="button-class">
            <button>Save</button>
            <button>Delete</button>	
        </div>
        </form>
    </section>
`;

function loadEvent() {

const rootElement = document.getElementById('root');

rootElement.insertAdjacentHTML('beforeend', formComponent);

const formElement = document.getElementById('form')

formElement.addEventListener('submit', e => {

    e.preventDefault();

    const formData = new FormData();

    formData.append('firstname', e.target.querySelector(`input[name='firstname']`).value);

    formData.append('surname', e.target.querySelector(`input[name='surname']`).value);

    formData.append('address', e.target.querySelector(`input[name='address']`).value);

    formData.append('zip', e.target.querySelector(`input[name='zip']`).value);

    formData.append('introduction', e.target.querySelector(`textarea[name='introduction']`).value);

    formData.append('button-class', e.target.querySelector(`.button-class`).value)


    const fetchSettings = {
        method: 'POST',
        body: FormData
    }


    fetch('/', fetchSettings)

        .then(async data => {

            if ( data.status === 200 ) {
                const res = await data.json()

            e.target.outerHTML = `<img src="upload/${res.pictureName}">`
            
            console.dir(data)
            }
        })
        .catch( error => {

            e.target.outerHTML = 'error'

            console.dir(error)
        })


});



}window.addEventListener('load', loadEvent)