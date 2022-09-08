/* filter sort and pagination */

class ProductFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    //filter
    filtering(){
        return this;
    }

    //sort with respect to price
    sorting(){
        return this;
    }

    //filter
    pagination(){
        return this;
    }


}

module.exports = ProductFeatures