const Order = require("../model/Order");

exports.changeOrderStatus = async (req, res) => {
    try {
        const { orderId, orderstatus } = req.body
        let orderUpdate = await Order.findByIdAndUpdate(
            orderId,
            { orderstatus },
            { new: true }
        )
        res.send(orderUpdate)
    } catch (err) {
        res.status(500).send('Server Error changeOrderStatus !!!')
    }
}
exports.getOrderAdmin = async (req, res) => {
    try {
        // Find the user's cart and populate the product details
        let order = await Order.find()
            .populate('products.product')
            .populate('orderBy', "username")
            .exec();


        res.json(order);
    } catch (error) {
        // Handle errors, and send a 500 Internal Server Error response
        res.status(500).send('Server Error getOrder User!!!');
    }
};