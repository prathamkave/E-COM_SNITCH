import productmodel from "../model/product.model.js";

export const createProduct = async (req, res) => {
	console.log(req.body);
	cosole.log(req.files);

	res.status(200).json({
		message: "Product created successfully",
		data: req.body,
	});
};
