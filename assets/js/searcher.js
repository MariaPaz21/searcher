let loadProductJSON = () => {
    let myURL = 'https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json';

    fetch(myURL)
        .then(response => response.json())
        .then(result => {
            let resultHTML = document.getElementById("templateproducts");
            resultHTML.innerHTML = '';

            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                let { name, type, price, src } = element;

                let template = `
            <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4 card-blog" style="display: flex;">
              <div class="card card-plain">
                <div class="card-header p-0 mt-n4 mx-3">
                  <a class="d-block shadow-xl border-radius-xl">
                    <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
                  </a>
                </div>
                <div class="card-body p-3">
                  <p class="mb-0 text-sm">${type}</p>
                  <a href="javascript:;">
                    <h5>${name}</h5>
                  </a>
                  <p class="mb-4 text-sm">
                    <b>Price: </b> $ ${price}
                  </p>
                </div>
              </div>
            </div>`;

                resultHTML.innerHTML += template;
            }
            let filterbtn = document.getElementById('filter');
            filterbtn.addEventListener('click', elementoSearch);


            let text = document.getElementById('text');
            text.addEventListener('keydown', function (event) {
                if (event.keyCode === 13) {
                    elementoSearch();
                }
            });

            function elementoSearch() {
                let text = document.getElementById('text').value.toLowerCase();
                let cards = document.querySelectorAll('.card-blog');
                console.log(text)
                cards.forEach(card => {
                    let name = card.querySelector('h5').textContent.toLowerCase();
                    let type = card.querySelector('.text-sm').textContent.toLowerCase();

                    if (name.includes(text) || type.includes(text)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

loadProductJSON();
