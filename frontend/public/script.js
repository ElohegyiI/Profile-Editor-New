const formComponent = `
    <section>
        <form action="" id='form' method='POST'>
            <h1>Profile Editor</h1>

            <input type="text" name="firstname"    placeholder="Firstname"><br>

            <input type="text" name="surname" placeholder="Surname"><br>

            <input type="text" name="address" placeholder="Address"><br>

            <input type="text" name="zip" placeholder="Zip or   postalcode"><br>

            <div class="area">
                <textarea id="introduction" name="introduction"         placeholder="Introduction" 	maxlength="300" required></textarea><br>
            </div>
            <div class="imginput">
            <img id="profile"></img>
            <input type="file"  name="picture">
        </div>
        <div class="button-class">
            <button type="submit" id="button">Save</button>
            <button type="reset">Delete</button>	
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

    formData.append("firstname", e.target.querySelector(`input[name="firstname"]`).value);

    formData.append("surname", e.target.querySelector(`input[name="surname"]`).value);

    formData.append("address", e.target.querySelector(`input[name="address"]`).value);

    formData.append("zip", e.target.querySelector(`input[name="zip"]`).value);

    formData.append("introduction", e.target.querySelector(`textarea[name="introduction"]`).value);

    /*formData.append('button-class', e.target.querySelector(`.button-class`).value)*/

    formData.append("picture", e.target.querySelector(`input[name="picture"]`).files[0])

    const fetchSettings = {
        
        method: 'POST',
        body: formData
    }


    fetch('/', fetchSettings)

        .then(async data => {

            if ( data.status === 200 ) {
                const res = await data.json()
                console.dir(res)
                alert('Your input has been submitted!')
            
            //console.dir(data)
            }
        })
        .catch( error => {

            e.target.outerHTML = 'error'

            console.dir(error)
        })


});

const imageInput = document.querySelector(`input[name="picture"]`);
    imageInput.addEventListener('change', e => {

        imageInput.classList.add("fileSelected");
        
        let selectedImg = e.target.files[0];

        let fileReader = new FileReader();

        fileReader.addEventListener('load', (e) => { 

            document.getElementById('profile').src = e.target.result 
        });

        fileReader.readAsDataURL(selectedImg);
    });


}window.addEventListener('load', loadEvent)