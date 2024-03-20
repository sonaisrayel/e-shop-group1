import { Favorites } from '../models/favorites-model.js';

export const deleteFavorite = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.userInfo.id;

        const favoriteData = await Favorites.findOneAndUpdate(
            { userId, products: productId },
            {
                $pull: {
                    products: productId,
                },
            },
            { new: true }
        );

        if (!favoriteData) {
            throw new Error('Product not found');
        }

        res.status(201).send({ message: 'Product has been removed from Favorites' });
    } catch (error) {
        res.status(404).send({ message: e.message });
    }
};

export const getFavorites = async (req, res) => {
    try {
        const { limit, skip } = req.query;
        const userId = req.userInfo.id;

        const favorites = await Favorites.findOne({ userId }).limit(limit).skip(skip).populate('products');

        res.status(201).send({ message: 'ok', data: favorites });
    } catch (e) {
        res.status(404).send({ message: e.message });
    }
};

export const addFavoriteProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userInfo.id;

        const favoriteData = await Favorites.findOneAndUpdate(
            { userId },
            { $addToSet: { products: productId } },
            { new: true }
        );

        if (!favoriteData) {
            throw new Error('Not found');
        }

        res.status(201).send({ message: 'Added to Favorites' });
    } catch (e) {
        res.status(404).send({ message: e.message });
    }
};
