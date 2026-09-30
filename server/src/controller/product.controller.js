import productmodel from "../model/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = async (req, res) => {
	console.log(req.body);
	cosole.log(req.files);

	const filesUrls = [];

	for (let i = 0; i < req.files.length; i++) {
		const response = await uploadFile({
			buffer: req.files[i].buffer,
			fileName: req.files[i].originalname,
		});

		filesUrls.push(response.url);
	}

	res.status(200).json({
		message: "Product created successfully",
		data: req.body,
	});
};
