const reviewModel = require("../Models/reviewModel")

const createReview = async(req,res)=>{
    const {name,rating,review,course,image}=req.body

    try {
        const createreview = await reviewModel.create({
            name,
            rating,
            review,
            course,
            image
        })
        console.log(createreview);
        res.status(201).send({message:"Review Submitted",success:true,createreview})
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Something Went wrong",success:false,error})
    }
}
const getReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find().sort({createdAt:"descending"})
        res.status(200).send({ success: true, reviews });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something Went wrong", success: false, error });
    }
};

// Update operation
const updateReview = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedReview = await reviewModel.findById(id)
        if(!updatedReview){
           return res.status(404).send({message:"Review Not Found"})
        }
        updatedReview.show=true
        await updatedReview.save()
        res.status(200).send({ message: "Review Updated", success: true, review: updatedReview });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something Went wrong", success: false, error });
    }
};

// Delete operation
const deleteReview = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        await reviewModel.findByIdAndDelete(id);
        res.status(200).send({ message: "Review Deleted", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something Went wrong", success: false, error });
    }
};

module.exports = {
    createReview,
    getReviews,
    updateReview,
    deleteReview
};