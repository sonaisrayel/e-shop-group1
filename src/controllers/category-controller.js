import { Category } from '../models/category-model.js';
import ResponseHandler from '../responses/responseHandler.js';

export const getCategories = async (req, res, next) => {
    try {
        const { limit, skip } = req.query;

        const [categories, totalDocuments] = await Promise.all([
            Category.find({}).limit(limit).skip(skip),
            Category.countDocuments({}),
        ]);

        if (!categories.length) {
            return ResponseHandler.handleNotFoundError(res, { message: 'Categories not found' });
        }

        return ResponseHandler.handleGetResponse(res, { data: categories, total: totalDocuments });
    } catch (err) {
        next(err.message);
    }
};

export const getCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        return ResponseHandler.handleGetResponse(res, { data: category });
    } catch (err) {
        next(err.message);
    }
};

export const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            return ResponseHandler.handleValidationError(res, { message: 'Name cannot be empty' });
        }

        const category = new Category({ name });
        await category.save();

        const createdCategory = await Category.find({ name });

        return ResponseHandler.handlePostResponse(res, { data: createdCategory });
    } catch (err) {
        next(err.message);
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        const { name, isDiscounted } = req.body;
        const { id } = req.params;

        if (!name) {
            return ResponseHandler.handleValidationError(res, { message: 'Category name cannot be empty' });
        }

        const discountInfo = isDiscounted === true || isDiscounted === false ? isDiscounted : false;

        const updatedCategory = await Category.findOneAndUpdate(
            { _id: id },
            { name, isDiscounted: discountInfo },
            { new: true }
        );

        return ResponseHandler.handleUpdateResponse(res, { data: updatedCategory });
    } catch (err) {
        next(err.message);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedCategory = await Category.deleteOne({ _id: id });

        if (!deletedCategory.acknowledged) {
            throw new Error();
        }

        return ResponseHandler.handleDeleteResponse(res, {
            message: `Deleted ${deletedCategory.deletedCount} category`,
        });
    } catch (err) {
        next(err.message);
    }
};
