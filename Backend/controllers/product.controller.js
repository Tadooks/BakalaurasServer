'use strict';
// import method but IT HAS TO BE UNIQUELY NAMED. Otherwise "export" does not know if you mean "let" or import.
// naming <method>_fileWhereItCameFrom.
import { getProducts as getProducts_service,
    getSingleProduct as getSingleProduct_service,
    addProduct as addProduct_service,
    editProduct as editProduct_service,
    deleteProduct as deleteProduct_service,
} from '../services/product.service.js'

let getProducts = function(request, response) {
    getProducts_service(request, function(error, data) {
        if (error){
            response(error, null);
        }else{
            response(null, data);
        }
    });
};


let getSingleProduct = function(request, response) {
    getSingleProduct_service(request, function(error, data) {
        if (error){
            response(error, null);
        }else{
            response(null, data);
        }
    });
};


let addProduct = function(request, response) {
    addProduct_service(request, function(error, data) {
        if (error){
            response(error, null);
        }else{
            response(null, data);
        }
    });
};


let editProduct = function(request, response) {
    editProduct_service(request, function(error, data) {
        if (error){
            response(error, null);
        }else{
            response(null, data);
        }
    });
};


let deleteProduct = function(request, response) {
    deleteProduct_service(request, function(error, data) {
        if (error){
            response(error, null);
        }else{
            response(null, data);
        }
    });
};

export {getProducts,getSingleProduct, addProduct, editProduct, deleteProduct};