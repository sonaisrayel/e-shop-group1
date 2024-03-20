import { Category } from '../models/category-model.js';

export const getCategories = async (req, res) => {
    try {
        const { limit, skip } = req.query;

        const [categories, totalDocuments] = await Promise.all([
            Category.find({}).limit(limit).skip(skip),
            Category.countDocuments({}),
        ]);

        if (!categories.length) {
            throw new Error('Categories not found');
        }

        res.status(200).send({ message: 'ok', data: categories, totalDocuments });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

export const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        res.status(200).send({ message: 'ok', data: category });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { userInfo } = req;

        if (userInfo.role !== 'admin') {
            throw new Error('Only an admin can add a new Category');
        }

        if (!name) {
            throw new Error('Name cannot be empty');
        }

        const category = new Category({ name });
        await category.save();

        const createdCategory = await Category.find({ name });

        res.status(200).send({ message: 'ok', data: createdCategory });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { name, isDiscounted } = req.body;
        const { id } = req.params;
        const { userInfo } = req;

        if (userInfo.role !== 'admin') {
            throw new Error('Only an admin can edit the Categories');
        }

        if (!name) {
            throw new Error('Category name cannot be empty');
        }

        const discountInfo = isDiscounted === true || isDiscounted === false ? isDiscounted : false;

        const updatedCategory = await Category.findOneAndUpdate(
            { _id: id },
            { name, isDiscounted: discountInfo },
            { new: true }
        );

        res.status(200).send({ message: 'ok', data: updatedCategory });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { userInfo } = req;

        if (userInfo.role !== 'admin') {
            throw new Error('Only an admin can delete the Categories');
        }

        const deletedCategory = await Category.deleteOne({ _id: id });

        if (deletedCategory.acknowledged) {
            res.status(200).send({ message: `Deleted ${deletedCategory.deletedCount} category` });
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};
