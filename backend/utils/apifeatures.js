const { find } = require("../models/productModel")

class Apifeatures {
    constructor(query, querystr) {
        // query = Product.find()
        // querystr query serch by user
        this.query = query
        this.querystr = querystr
    }
    //search feture
    search() {
        const keyword = this.querystr.keyword ? {
            name: {
                $regex: this.querystr.keyword,
                $options: "i"
            }
        } : {}

        this.query = this.query.find({ ...keyword })
        return this
    }

    // for filute product like categary prise date etc...
    filter() {
        const copyqurystr = { ...this.querystr };
        const removeFilds = ["keyword", 'page', 'limi']
        removeFilds.forEach(key => {
            delete copyqurystr[key]
            // console.log(key)

        });
        console.log(copyqurystr)
        // filter gor prise
        let queryforprise = JSON.stringify(copyqurystr)
        queryforprise = queryforprise.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
        console.log(queryforprise)
        // this.query = this.query.find(copyqurystr)
        this.query = this.query.find(JSON.parse(queryforprise))
        return this

    }
    pagination(resultperpage) {

        const currentpage = Number(this.querystr.page) || 1
        const skip = resultperpage * (currentpage - 1)
        this.query = this.query.limit(resultperpage).skip(skip)
        return this
    }

}

module.exports = Apifeatures