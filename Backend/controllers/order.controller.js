'use strict';
// import method but IT HAS TO BE UNIQUELY NAMED. Otherwise "export" does not know if you mean "let" or import.
// naming <method>_fileWhereItCameFrom.
import { getOrders as getOrders_service,
    getSingleOrder as getSingleOrder_service,
    addOrder as addOrder_service,
    editOrder as editOrder_service,
    deleteOrder as deleteOrder_service,
} from '../services/order.service.js'

import {
    getSingleProduct,
} from '../services/product.service.js'

let getOrders = function(request, response) {
    getOrders_service(request, function(error, data) {
        if (error){
            response(error, null);
        }else{
            response(null, data);
        }
    });
};


let getSingleOrder = function(request, response) {
    getSingleOrder_service(request, function(error, data) {
        if (error){
            response(error, null);
        }else{
            response(null, data);
        }
    });
};

let getUserAllOrders = function(request, response) {
    getOrders_service(request, function(error, allOrders) {
        if (error){
            response(error, null);
        }else{
            const userOrders = allOrders.filter(item => item.authid === request);
            response(null, userOrders);
        }
    });
};


//--------------------------------Add order--------------------------------------------
//we recalculate price according to the gotten id that is matched to the product from db.
// After we get the product. We replace existing product with the one from database. 
// This is to avoid innacurate data / modified data that might be sent from frontend.
let addOrder = async function(request, response) {

    const copiedArray = JSON.parse(JSON.stringify(request));
    let totalCount = 0;
    for (let i = 0; i < copiedArray.products.length; i++) {
        let product = copiedArray.products[i];
        totalCount = totalCount + product.amount;
        const newProduct = await calculatePrice(product).catch(err => {
            console.log(err);
        });

        if(!newProduct){
            response("Bad data no no", null);
            return;
        }
        copiedArray.products[i] = newProduct;
    }
    copiedArray.totalproductcount = totalCount;
    copiedArray.orderdate = Date.now();
    copiedArray.paymentstatus = "unpaid";
    copiedArray.deliverystatus = "not sent";
    addOrder_service(copiedArray, function(error, data) {
        if (error){
            response(error, null);
        }else{
            response(null, data);
        }
    });
};

//calculate price AND setting product.productSize in the products object that gets added from cart
var calculatePrice = function (product) {
    return new Promise(function (resolve, reject) {
  
        getSingleProduct(product.uid, function(error, productFromDB) {
            if (error){
                reject(error);
            }else{
                //Total price does not work if product does not exist
                if(!productFromDB|| productFromDB.error || product.amount < 1) reject("No product")

                //!!! for setting product merch size !!! from frontend to backend for later use for admin for panels and stuff
                if(product.productSize){
                    productFromDB.productSize =product.productSize;
                }

                productFromDB.amount = product.amount;
                productFromDB.totalprice = productFromDB.price * product.amount;
                productFromDB.totalprice = productFromDB.totalprice;
                resolve(productFromDB)
            }
        });
    });
};
//-------------------------------------------------------------------------------------------



let editOrder = function(request, response) {
    editOrder_service(request, function(error, data) {
        if (error){
            response(error, null);
        }else{
            response(null, data);
        }
    });
};





let deleteOrder = function(request, response) {
    deleteOrder_service(request, function(error, data) {
        if (error){
            response(error, null);
        }else{
            response(null, data);
        }
    });
};

export {getUserAllOrders, getOrders,getSingleOrder, addOrder, editOrder, deleteOrder};