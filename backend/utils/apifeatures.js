class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword
        ?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i"
            },
        }
        :{}
        //console.log(keyword);

        this.query = this.query.find({...keyword})
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr};
        //Filter for Removing some fields for category.
            //console.log(queryCopy);
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach((key)=> delete queryCopy[key]);
            //console.log(queryCopy)
        
        //Filter for Price and Ratings.
        //console.log(queryCopy);
        //converting obj into string.
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=>`$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        //console.log(queryStr);
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = Number(resultPerPage) * Number(currentPage - 1);             // 25 - 5

        this.query = this.query.limit(Number(resultPerPage)).skip(Number(skip)); 
        return this;


    }    


}

module.exports = ApiFeatures