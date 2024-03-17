import { Category } from '../models/category-model.js';
import JWT from '../libs/jwt-lib.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).send({ message: 'ok', data: categories });
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
        const {} = req.body;
        const { id } = req.params;

        res.status(200).send({ message: 'ok' });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        res.status(200).send({ message: 'ok' });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};
