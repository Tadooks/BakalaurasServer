'use strict';
// import method but IT HAS TO BE UNIQUELY NAMED. Otherwise "export" does not know if you mean "let" or import.
// naming <method>_fileWhereItCameFrom.
import { add_review as add_review_service,
        get_all_reviews as get_all_reviews_service,
        get_all_for_product_reviews as get_all_for_product_reviews_service,
        delete_review as delete_review_service,
        edit_review as edit_review_service} from '../services/review.service.js'


let addReview = function(request, response) {
    //patikrinam ar nera idetas atsiliepimas
    get_all_for_product_reviews_service(request, function(error, allReviews) {
        if (error){
            response(error, null);
        }else{
            console.log(allReviews)
            console.log(request)
            //filtruojam kad patikrint kiek komentaru padares vartotojas pagal jo email
            const filteredReviews = allReviews.filter(item => item.email === request.email);
            if(filteredReviews.length < 1){
                //jei neidetas atsiliepimas, ideti atsiliepima
                add_review_service(request, function(error, review) {
                    if (error){
                        response(error, null);
                    }else{
                        response(null, review);
                    }
                });
            }else{
                response("Too many reviews inserted !", null);
            }
        }
    });
};

let getAllReviewsOnProduct = function(request, response) {
    get_all_for_product_reviews_service(request, function(error, allReviews) {
        if (error){
            response(error, null);
        }else{
            let filteredReviews = []
            if(request.email){
                filteredReviews = allReviews.filter(item => item.visable === true || item.email == request.email);
            }else{
                filteredReviews = allReviews.filter(item => item.visable === true);
            }
            response(null, filteredReviews);
        }
    });
};

let editReview = function(request, response) {
    edit_review_service(request, function(error, allReviews) {
        if (error){
            response(error, null);
        }else{
            response(null, allReviews);
        }
    });
};


let deleteReview = function(request, response) {
    delete_review_service(request, function(error, allReviews) {
        if (error){
            response(error, null);
        }else{
            response(null, allReviews);
        }
    });
};



let getAllReviews = function(request, response) {
    get_all_reviews_service(request, function(error, allReviews) {
        if (error){
            response(error, null);
        }else{
            response(null, allReviews);
        }
    });
};

export {addReview, getAllReviewsOnProduct, editReview, deleteReview , getAllReviews};