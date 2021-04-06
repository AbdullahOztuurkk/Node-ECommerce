const mongoose=require('mongoose');

const CategorySchema=new mongoose.Schema(
	{
		name: {type: String},
	},
	{
		versionKey: false  
	}
);

CategorySchema.pre('remove',async function(next){
	console.log('Deleted products by the specified deleted category'.green);
	await this.model('Product').deleteMany({ Category: this._id })
	next();
});

module.exports = mongoose.model('Category', CategorySchema);