let deliveryRadio = document.querySelectorAll('.ordering__select__delivery__radio');
let selectFaceBtn = document.querySelectorAll('.ordering__select__face-selection__btn');
const overlay = document.querySelector('.overlay');
let courier = document.querySelector('input[value="courier"]');
let transportCompany = document.querySelector('input[value="transport-company"]');
let pickup = document.querySelector('input[value="pickup"]');
let deliveryMethod = document.querySelector('.delivery-method');
let deliveryPrice = document.querySelector('.delivery-price');
let totalPrice = document.querySelectorAll('.total');
let radioButtons = document.querySelectorAll('.ordering__select__delivery__custom-radio');

function display() {
    if (courier.checked) { 
        deliveryMethod.innerHTML = "Доставка курьерской службой";
        deliveryPrice.innerHTML =  "710 ₽";
    }
    else if (transportCompany.checked) { 
        deliveryMethod.innerHTML = "Доставка транспортной компанией";
        deliveryPrice.innerHTML =  "210 ₽";
    }
    else if (pickup.checked) { 
        deliveryMethod.innerHTML = "Самовывоз";
        deliveryPrice.innerHTML =  "180 ₽";
    }
    totalPrice.forEach((element) => {element.innerHTML = (18344 + (parseInt(deliveryPrice.innerHTML))).toLocaleString() + ' ₽'});
}


for (const radio of deliveryRadio) {
        radio.addEventListener('click', () => {
        deliveryRadio.forEach(function (item, i) {
            if (radio === item) {
                item.classList.add('active');
                radioButtons[i].checked = true;
            } else {
                item.classList.remove('active');
            }
            if (radio.classList.contains('pickup')) {
                overlay.style.display = 'block';
            }
        })
    })
    radio.addEventListener('click', display);
}


overlay.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('overlay') || target.classList.contains('close')) {
        overlay.style.display = 'none';
    }
});

for (const btn of selectFaceBtn) {
    btn.addEventListener('click', () => {
        selectFaceBtn.forEach(item => {
            if (btn === item) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        })
    })
}


// Y.maps
let pointSelect = document.querySelector('.ordering__select__point__select');
const map1 = document.querySelector('.ordering__select__point__map-1')
const map2 = document.querySelector('.ordering__select__point__map-2')

pointSelect.addEventListener('change', () => {
    map1.classList.toggle('active');
    map2.classList.toggle('active');
})

// validation
let regexpEmail = /^[a-zA-Z0-9._@]+$/;
let inputEmails = document.querySelectorAll('.input-email');
let small = document.querySelectorAll('.small');


inputEmails.forEach(function(email, i) {
    email.addEventListener('input', function checkEmail() {
        if ((email.value.match(regexpEmail))) {
            email.style.border = '1px solid #c4b7b1';
            small[i].style.display = 'none';
        } else {
            email.style.border = '1px solid rgb(230, 69, 69)';
            small[i].style.display = 'block';
        }
    })
})

function maskPhone(selector, masked = '___ ___ __-__') {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
	
}

let textarea = document.querySelector('.textarea');

let sym;
function checkText(s) {
    s.target.value = s.target.value.replace(/&/, '\u0026').replace(/</, '\u003c').replace(/>/, '\u003e').replace(/{/, '\u007b').replace(/}/, '\u007d');
}

textarea.addEventListener("input", checkText);

maskPhone('.input-phone');
display();



