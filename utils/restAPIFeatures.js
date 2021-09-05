class RestAPIFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    filter(){
        // 1) filtering
        const queryObj = {...this.queryStr};
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);

        // 1.5) advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort(){
        // 2) sorting
        if(this.queryStr.sort){
            
            const sortBy = this.queryStr.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy);
        }else{
            this.query = this.query.sort('-Place');
        }
        
        return this;
    }

    limitFields(){
        if(this.queryStr.fields){
            const fields =  this.queryStr.fields.split(',').join(' ')
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select('-__v');
        }

        return this;
    }

    paginate(){
        const page = this.queryStr.page*1 || 1;
        const limit = this.queryStr.limit*1 || 100;
        const skip = (page-1)*limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

}

module.exports = RestAPIFeatures;