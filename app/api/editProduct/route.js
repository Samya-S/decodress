import Product from "@/models/Product";
import connectDB from "@/middleware/connectToDB";

export async function POST(request) {
    try {
        // Calls the connect function to establish a connection to the database.
        await connectDB();

        const reqBody = await request.json();

        if (reqBody.title == "" || reqBody.category == "" || reqBody.img == "" || reqBody.description == "" || reqBody.price == "" || reqBody.availableQty == "") {
            return Response.json({
                status: 400,
                body: { success: false, error: "Failed to update product! Please fill the required fields" },
            });
        }

        // const slug = reqBody.title.toLowerCase().replace(/ /g, "-") + "-" + reqBody.category.toLowerCase().replace(/ /g, "-") + "-" + reqBody.color.toLowerCase().replace(/ /g, "-") + "-" + reqBody.size.toLowerCase().replace(/ /g, "-");
        const slug = reqBody.title.toLowerCase().replace(/ /g, "-") + (reqBody.color ? '-' : '') + reqBody.color.toLowerCase().replace(/ /g, "-") + (reqBody.size ? '-' : '') + reqBody.size.toLowerCase().replace(/ /g, "-");

        const updatedProduct = await Product.findByIdAndUpdate(reqBody._id, {
            title: reqBody.title,
            slug: slug, // generate slug from title, color and size by making them lowercase and replacing spaces with hyphens
            description: reqBody.description,
            img: reqBody.img,
            category: reqBody.category,
            size: reqBody.size,
            color: reqBody.color,
            price: reqBody.price,
            availableQty: reqBody.availableQty,
        }, { new: true });

        return Response.json({
            status: 201,
            body: { success: true, data: updatedProduct },
        });
    } catch (error) {
        return Response.json({
            status: 500,
            body: { success: false, error: "Failed to update product! " + error.message },
        });
    }
}
