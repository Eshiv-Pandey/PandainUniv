function getunivimage(name){
  const image={
    "Manhattan":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSB5c481j4Q6IoUj2Yg595fREHScBOoAUzXw&s",
    "Oxford":"https://i.pinimg.com/1200x/39/8d/c4/398dc4cd0196bb97971c70be301320cd.jpg",
    "Harvard":"https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/1123/Harvard_University_logo-1024.png",
  }
return image[name] ||"https://cdn2.iconfinder.com/data/icons/college-12/62/shield-academy-badge-logo-sign-512.png";
} 

module.exports=getunivimage;