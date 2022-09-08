const Category = require('../model/categoryModel');

const CategoryCtrl = {
    getAll: async(req,res)=>{
        try {
            let data = await Category.find()
            res.json({
                categories:data,
                length: data.length
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getSingle: async(req,res)=>{
        try {
            let category = await Category.findById({_id: req.params.id})
            res.json({category})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    create: async(req,res)=>{
        try {
            await Category.create(req.body)
            res.status(200).json({msg: "category created Successfully"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    update: async(req,res)=>{
        try {
            let category = await Category.findOneAndUpdate({_id: req.params.id}, req.body)
            if(!category)
            return res.status(400).json({msg: "Category id not exists"})

            res.status(200).json({msg: "category updated successfully"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    delete: async(req,res)=>{
        try {
            await Category.findOneAndDelete({_id: req.params.id});
            res.status(200).json({msg:"category deleted successfully"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = CategoryCtrl