function formSubmit(event) {
    var submitGroup = document.getElementById('submit-group');
    alert = createAlert(submitGroup, 'alert-info', 'Processing...');
    submitGroup.parentNode.removeChild(submitGroup);
    var url = "https://script.google.com/macros/s/AKfycbwPuPV_CvOgcgRzpUIvdS8yZSU3_b_nw2ODTRtb05dyhD9kKytH/exec";
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.onload = function() { // request successful
    // we can use server response to our request now
      console.log(request.responseText);
      updateAlert(alert, 'alert-success', 'Success! Your order has been received! Please venmo @will-fuchs-99.');
    };
  
    request.onerror = function() {
        updateAlert(alert, 'alert-danger', 'Uh oh! Something went wrong... Please email your order to thirdfarmbakery@gmail.com! Sorry about that');
    };
    try {
        request.send(new FormData(event.target)); // create FormData from form that triggered event
    }
    catch(e) {
        console.log(e)
    }
    event.preventDefault();
    return false;
}

function createAlert(after, status, message) {
    var alert = document.createElement('div');
    alert.id = 'status';
    after.parentNode.insertBefore(alert, after.nextSibling);
    return updateAlert(alert, status, message);
}

function updateAlert(alert, status, message) {
    alert.classList.remove(...alert.classList);
    alert.classList.add('alert', status);
    alert.innerHTML = message;

    return alert;
}

function attachFormSubmitEvent(formId){
    document.getElementById(formId).addEventListener("submit", formSubmit);
}

function populateBreadSelects() {
    var min = 0,
        max = 10,
        breads = document.getElementsByClassName('bread');
    console.log(breads);

    for (var j = 0; j<breads.length; j++) {
        const bread = breads[j];
        // Add the images
        img = document.createElement('img');
        img.src = './Assets/' + bread.id + '.png';
        img.classList.add('mw-100');
        bread.parentNode.insertBefore(img, bread);
        // Allow people to pre-order 0-10 loaves
        for (var i = min; i<=max; i++){
            var opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            bread.appendChild(opt);
        }
        // Sum the order total on every change
        bread.addEventListener('change', () => {sumOrder();});

        // Add the price of each loaf
        priceTag = document.createElement('small');
        priceTag.innerHTML = '$' + bread.getAttribute('data-price') + '.00 ea';
        priceTag.id = bread.id + '-price';
        priceTag.classList.add('form-text', 'text-muted');
        bread.parentNode.insertBefore(priceTag, bread);
        bread.setAttribute('aria-describedby', priceTag.id);
    }
}

function sumOrder() {
    breads = document.getElementsByClassName('bread');
    var total = 0;
    for (var i = 0; i<breads.length; i++) {
        bread = breads[i];
        breadPrice = bread.getAttribute('data-price');
        total += breadPrice * bread.value;
        console.log(total);
    }
    document.getElementById('total').value= "$" + total;
}