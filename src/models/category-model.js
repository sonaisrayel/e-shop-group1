const bookCategories = [
    { id:1, name:"Fiction" },
    { id:2, name:"Science Fiction" },
    { id:3, name:"Mystery" },
    { id:4, name:"Thriller" },
    { id:5, name:"Fantasy" },
    { id:6, name:"Historical fiction"},
    { id:7, name:"Adventure" },
    { id:8, name:"Romance novel" },
    { id:9, name:"Horror" },
    { id:10, name:"Biography" },
    { id:11, name:"History" },
    { id:12, name:"Fairy tale" }
  ];
  
  
  import mongoose from 'mongoose';
  const Schema = mongoose.Schema;

  const categorySchema = new mongoose.Schema({
    name:{type:String, 
          isDiscounted:false, 
          required:true},
  });
  
  const Category = mongoose.model('Category', categorySchema);
  
  module.exports = Category;
