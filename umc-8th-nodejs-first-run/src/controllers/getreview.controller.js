export const handleListStoreReivews = async (req, res, next) => {
    const reviews = await listStoreReview (
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
};