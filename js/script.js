// Cart variables
let quantity = 0;
let cart = 0;
let details = "";

// Color tracking variables
let colors = ["Red", "Violet", "Black", "White", "Orange", "Yellow", "Navy Blue", "Turquoise", "Beige", "Sky Blue", "Lime Green", "Pink", "Cream", "Emerald Green", "Dark Grey", "Brown", "Aqua Marine", "Light Grey"];
let colorclasses;


// Color class with the associated attributes and methods (getters and setters)
class Color {
    constructor(color, cost) {
        this.name = color;
        this.quantity = 0;
        this.price = cost;
    }
    get button() {
        let btnName = this.name.toLowerCase().replace(" ","-");
        return "<button class='inline-block color-button button-" + btnName + "' onclick=colorSelect('" + this.name + "');></button>";
    }
    set quantitySet(amount) {
        this.quantity = amount;
    }
    get quantityGet() {
        return this.quantity;
    }
    get priceGet() {
        return this.price;
    }
}

// Create the color objects that are for sale
function createColors() {
    colorclasses = {
        "Red": new Color("Rouge", 149.99),
        "Violet": new Color("Violet", 159.99),
        "Black": new Color("Noir", 209.99),
        "White": new Color("Blanc", 199.99),
        "Orange": new Color("Orange", 169.99),
        "Yellow": new Color("Jaune", 179.99),
        "Navy Blue": new Color("Bleu", 189.99),
        "Turquoise": new Color("Turquoise", 139.99),
        "Beige": new Color("Beige", 129.99),
        "Sky Blue": new Color("Bleue ciel", 219.99),
        "Lime Green": new Color("Vert clair", 119.99),
        "Pink": new Color("Rose", 169.49),
        "Cream": new Color("Crème", 139.49),
        "Emerald Green": new Color("Vert Emeraude", 179.49),
        "Dark Grey": new Color("Gris noir", 189.49),
        "Brown": new Color("Marron", 129.49),
        "Aqua Marine": new Color("Bleu Marine", 199.49),
        "Light Grey": new Color("Gris clair", 169.49),
    }
}

// Change the color to the user selected option
function colorSelect(color) {
    document.getElementById("color-choice1").innerHTML = color;
    document.getElementById("color-choice2").innerHTML = color;
    document.querySelector(".cart-button").innerHTML = "<strong>Add to Cart</strong>";
    document.querySelector("#price").innerText =colorclasses[color].priceGet + "DT";
    document.querySelector("#original-price").innerText = (colorclasses[color].priceGet*1.25).toFixed(2) + "DT";
    document.querySelector("#add-to-cart-button").dataset.target = "#myModal";

}

// Increment the quantity of the item and update the html
function increment() {
    quantity++;
    document.querySelector("#quant").innerHTML = quantity;
}

// Decrement the quantity of the item and update the html
function decrement() {
    if(quantity>0){
        quantity--;
        document.querySelector("#quant").innerHTML = quantity;
    } else {
        document.querySelector("#quant").innerHTML = quantity;
    }   
}

// Updates the cart after the user clicks agree (on modal)
function updateCart() {
    // Fetch the current color choice
    let color = document.getElementById("color-choice2").innerText;
    // Set that color's quantity to the selected amount
    colorclasses[color].quantitySet = quantity;
    // Get the total number of colors in the cart
    cart = sumItems(colorclasses);
    // Update the cart text to the total number of items
    document.querySelector("#quantity").innerHTML = cart;
    // Variable to track total cost
    let total = 0;
    // Set the color icons below the DETAILS section and calculate total
    for(const item of colors) {
        if(colorclasses[item].quantityGet != 0) {
            for (let i = colorclasses[item].quantityGet; i > 0; i--){
                details += colorclasses[item].button;
                total += colorclasses[item].priceGet; 
            }
        }
    }
    document.querySelector("#details").innerHTML = "<p><strong>DETAILS</strong></p>"+details;
    details = "";
    document.querySelector("#price").innerText = total.toFixed(2) + "DT";
    document.querySelector("#original-price").innerText = (total*1.25).toFixed(2) + "DT";

    // Change Add to Cart button text to Checkout and redirect to checkout modal
    document.querySelector("#add-to-cart-button").innerHTML = "<strong>Checkout now</strong>";
    document.querySelector("#add-to-cart-button").dataset.target = "#checkoutModal";
}

// Updates the color choice and quantity in the modal
function updateQuant(){
    let color = document.getElementById("color-choice1").innerText;
    if (color == 'Select a color'){
        document.querySelector("#quant").innerText = "0";
        quantity = 0;
    } else {
        document.querySelector("#quant").innerText = colorclasses[color].quantityGet;
        quantity = colorclasses[color].quantityGet;
    }

    // Load the checkout modal with the cart items
    let items = "";
    let total = 0;
    for(const item of colors) {
        if(colorclasses[item].quantityGet != 0) {
            items += "<p>";
            for (let i = colorclasses[item].quantityGet; i > 0; i--){
                items += colorclasses[item].button;
                total += colorclasses[item].priceGet; 
            }
            items += '<span class="inline-block" style="float: right; padding: 10px; margin-right: 20px;"><strong> X '+colorclasses[item].priceGet+' = '+(colorclasses[item].priceGet*colorclasses[item].quantityGet).toFixed(2)+'</strong></span>';
            items += "</p>";
        }
    }
    items += "<br>"
    items += "<h4>Cart total = " + total.toFixed(2) + "</h4>"
    document.querySelector("#summary").innerHTML = items;
}

function resetQuantity(){
    quantity = 0;
}

function sumItems(obj) {
    let sum = 0;
    for( var col in obj){
        sum+= obj[col].quantityGet;
    }
    return sum;
}