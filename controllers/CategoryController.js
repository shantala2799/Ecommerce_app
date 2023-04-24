import categoryModel from '../models/categoryModel.js'
import slugify from 'slugify'

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({
                message: 'Name is required'
            })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category already exists'
            })
        }

        // saves in mongodb 
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: 'New category created successfully',
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in category',
            error
        })
    }
}

// Update category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            messsage: "Category Updated Successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category",
        });
    }
};

// Get all category
export const getAllCategory = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        return res.status(200).send
            ({
                success: true,
                message: 'All category list',
                category
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in fetching',
            error
        })
    }
}

// Getting single category
export const singleCategory = async (req, res) => {
    try {
        const { slug } = req.params
        const category = await categoryModel.findOne({ slug: req.params.slug })
        return res.status(200).send
            ({
                success: true,
                message: 'Single category list',
                category
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: 'Error in getting single category',
            error
        })
    }
}

// delete category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        const category = await categoryModel.findByIdAndDelete(id)
        return res.status(200).send
            ({
                success: true,
                message: 'Deleted category successfully',
                category
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: 'Error in deleting category',
            error
        })
    }
}