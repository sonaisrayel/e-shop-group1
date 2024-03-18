import { Favorites } from '../models/favorites-model.js';

export const deleteFavorite = async (req, res) => {
    const { productId } = req.params;
    const userId = req.userInfo.id;

    try {
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
            throw new Error('Item not found');
        }

        res.status(201).send('ok');
    } catch (error) {
        res.status(404).send(error.message);
    }
};

export const getFavorites = async (req, res) => {
    const { limit, skip } = req.query;
    const userId = req.userInfo.id;

    try {
        const favorites = await Favorites.findOne({ userId }).limit(limit).skip(skip).populate('products');

        res.status(201).send({ favorites });
    } catch (e) {
        res.status(404).send(e.message);
    }
};

export const addFavoriteProduct = async (req, res) => {
    const { productId } = req.body;

    const userId = req.userInfo.id;
    try {
        const favoriteData = await Favorites.findOneAndUpdate(
            { userId },
            { $addToSet: { products: productId } },
            { new: true }
        );

        if (!favoriteData) {
            throw new Error('Not found');
        }

        res.status(201).send('added');
    } catch (e) {
        res.status(404).send(e.message);
    }
};
