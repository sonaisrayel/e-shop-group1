import { Favorites } from '../models/favorites-model.js';
import ResponseHandler from '../responses/responseHandler.js';

export const deleteFavorite = async (req, res, next) => {
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
            return ResponseHandler.handleNotFoundError(res, { message: 'Product not found' });
        }
        return ResponseHandler.handleDeleteResponse(res, { message: 'Product has been removed from Favorites' });
    } catch (err) {
        next(err.message);
    }
};

export const getFavorites = async (req, res, next) => {
    try {
        const { limit, skip } = req.query;
        const userId = req.userInfo.id;

        const favorites = await Favorites.findOne({ userId }).limit(limit).skip(skip).populate('products');

        return ResponseHandler.handleGetResponse(res, { data: favorites });
    } catch (err) {
        next(err.message);
    }
};

export const addFavoriteProduct = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const userId = req.userInfo.id;

        const favoriteData = await Favorites.findOneAndUpdate(
            { userId },
            { $addToSet: { products: productId } },
            { new: true }
        );

        if (!favoriteData) {
            return ResponseHandler.handleNotFoundError(res, { message: 'Not found' });
        }

        return ResponseHandler.handlePostResponse(res, { message: 'Added to Favorites', data: favoriteData });
    } catch (err) {
        next(err.message);
    }
};
