const cl = console.log;

const formId = document.getElementById("formId");

const productNameC = document.getElementById("productName");

const productDesC = document.getElementById("productDes");

const productImgC = document.getElementById("productImg");

const ratingC = document.getElementById("rating");

const productRow = document.getElementById("productRow");

const updateBtn = document.getElementById("updateBtn");

const submitBtn = document.getElementById("submitBtn");

let productArr = [];

if (localStorage.getItem("productArr2")) {
    productArr = JSON.parse(localStorage.getItem("productArr2"));
}



const uuid = () => {
    return String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(
        /[xy]/g,
        character => {
            const random = (Math.random() * 16) | 0
            const value = character === 'x' ? random : (random & 0x3) | 0x8
            return value.toString(16)
        }
    )
}

const localFunction = (arr) => {
    localStorage.setItem("productArr2", JSON.stringify(arr))
}

const creatProduct = (arr) => {
    let result = "";
    arr.forEach((pr, i) => {
        let ratingValue = Number(pr.rating);
    
        if (ratingValue <= 1) {
            ratingValue = 1;
        }
        if (ratingValue >= 5) {
            ratingValue = 5;
        }

        let rating = "⭐".repeat(ratingValue);

        result += `<div class="col-md-4" id="${pr.productId}">
                <div class="card produt-card">
                    <div class="card-body">
                        <figure>
                            <img src="${pr.productImg}" alt="${pr.productName}">

                            <figcaption>
                               <h6>${pr.productName}<h6>
                                <p>
                                ${pr.productDes}
                                     </p>
                            </figcaption>
                        </figure>

                        <h5 class="mb-3">${pr.productName}<span>${rating}</span></h5>

                        <div class="d-flex justify-content-between">
                            <button class="btn btn-outline-primary" onclick="onEdit(this)">Edit</button>
                            <button class="btn btn-outline-danger" onclick="onRemove(this)">remove</button>
                        </div>
                    </div>
                </div>
            </div>`
    })

    productRow.innerHTML = result;
}

creatProduct(productArr);

const creatNewProduct = (obj) => {

    let ratingValue = Number(obj.rating);
   
    if (ratingValue <= 1) {
        ratingValue = 1;
    }
    if (ratingValue >= 5) {
        ratingValue = 5;
    }

    let rating = "⭐".repeat(ratingValue);

    let product = document.createElement("div");

    product.id = obj.productId;
    product.className = "col-md-4";

    product.innerHTML = `<div class="card produt-card">
                    <div class="card-body">
                        <figure>
                            <img src="${obj.productImg}" alt="${obj.productName}">

                            <figcaption>
                                <p>
                                ${obj.productDes}
                                     </p>
                            </figcaption>
                        </figure>

                        <h5 class="mb-3">${obj.productName}<span>${rating}</span></h5>

                        <div class="d-flex justify-content-between">
                            <button class="btn btn-outline-primary" onclick="onEdit(this)">Edit</button>
                            <button class="btn btn-outline-danger" onclick="onRemove(this)">remove</button>
                        </div>
                    </div>
                </div>`;

    productRow.prepend(product);
}

const onRemove = (ele) => {

    Swal.fire({
        title: "Do you want to delete",
        showCancelButton: true,
        confirmButtonText: "delete",
    }).then((result) => {


        if (result.isConfirmed) {
            let REMOVE_ID = ele.closest(".col-md-4").id;
            cl(REMOVE_ID);

            let findIndex = productArr.findIndex(product => product.productId === REMOVE_ID);

            productArr.splice(findIndex, 1);
            localFunction(productArr);
            ele.closest(".col-md-4").remove();

            Swal.fire({
                title: "todo deleted successfully",
                icon: "success",
                draggable: true,
                timer: 1500
            });
        }


    });
};
let EDIT_ID;
const onEdit = (ele) => {
    EDIT_ID = ele.closest(".col-md-4").id;

    let EDIT_OBJ = productArr.find(product => product.productId === EDIT_ID);

    productNameC.value = EDIT_OBJ.productName;
    productDesC.value = EDIT_OBJ.productDes;
    productImgC.value = EDIT_OBJ.productImg;
    ratingC.value = EDIT_OBJ.rating;

    updateBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
}


const updateEvent = () => {

    let UPDATE_ID = EDIT_ID;

    let UPDATE_OBJ = {
        productName: productNameC.value,
        productDes: productDesC.value,
        productImg: productImgC.value,
        rating: ratingC.value,
        productId: UPDATE_ID
    }

    let getIndex = productArr.findIndex(product => product.productId === UPDATE_ID);

    productArr[getIndex] = UPDATE_OBJ;

    localFunction(productArr);

    formId.reset();

    let all = document.getElementById(UPDATE_ID);

    let TagImg = all.querySelector("img");
    let ImgDes = all.querySelector("figcaption p");
    let headingTag = all.querySelector("h5");


    let ratingValue = Number(UPDATE_OBJ.rating);

    if (ratingValue <= 1) {
        ratingValue = 1;
    }
    if (ratingValue >= 5) {
        ratingValue = 5;
    }

    let rating = "⭐".repeat(ratingValue);


    TagImg.src = UPDATE_OBJ.productImg;
    TagImg.alt = UPDATE_OBJ.productName;
    ImgDes.textContent = UPDATE_OBJ.productDes;
    headingTag.innerHTML = `${UPDATE_OBJ.productName} <span>${rating}</span>`;

    updateBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");

    Swal.fire({
        title: "todo updated successfully",
        icon: "success",
        draggable: true,
        timer: 1500
    });
}







const onsubmitEvent = (eve) => {
    eve.preventDefault();
    cl("clicked")

    let OBJ = {
        productName: productNameC.value,
        productDes: productDesC.value,
        productImg: productImgC.value,
        rating: ratingC.value,
        productId: uuid()
    }


    productArr.unshift(OBJ);

    formId.reset();


    cl(productArr)

    creatNewProduct(OBJ);

    localFunction(productArr);

    Swal.fire({
        title: "todo added successfully",
        icon: "success",
        draggable: true,
        timer: 1500
    });

}

cl(productArr)

formId.addEventListener("submit", onsubmitEvent);
updateBtn.addEventListener("click", updateEvent);