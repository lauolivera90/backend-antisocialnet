const mongoose = require('mongoose');
const User = require('./src/models/User'); 
const Tag = require('./src/models/Tag'); 
const Post = require('./src/models/Post'); 
const Comment = require('./src/models/Comment');
require('dotenv').config() 

const MONGO_URI = process.env.MONGO_URI

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conexión establecida...");

    // Limpieza total
    await User.deleteMany({});
    await Tag.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    console.log("Base de datos reseteada.");

    const usersData = [
      { nickname: "cat_lover", mail: "michi@mail.com", password: "123456" },
      { nickname: "news_daily", mail: "noticias@mail.com", password: "123456" },
      { nickname: "fitness_pro", mail: "gym@mail.com", password: "123456" },
      { nickname: "arg_pasion", mail: "argentina@mail.com", password: "123456" },
      { nickname: "it_master", mail: "informatica@mail.com", password: "123456" }
    ];
    const users = await User.insertMany(usersData);
    console.log("5 Usuarios creados.");

    const tagsData = [
      { name: "Gatos" }, { name: "Noticias" }, { name: "Fitness" }, 
      { name: "Argentina" }, { name: "Informática" }, { name: "Deportes" }, 
      { name: "Tecnología" }, { name: "Humor" }, { name: "Viajes" }, { name: "Comida" }
    ];
    const tags = await Tag.insertMany(tagsData);
    console.log("10 Tags creados.");

    const postsData = [
      { // Post IT Master (Sin imágenes)
        description: "Acabo de terminar mi primer script de seeding en Node.js. ¡La automatización es vida!",
        user: users[4]._id,
        image: [],
        tag: [tags[4]._id, tags[6]._id]
      },
      { 
        description: "Mis gatos no me dejan programar, se acostaron arriba del teclado de nuevo.",
        user: users[0]._id,
        image: [],
        tag: [tags[0]._id, tags[7]._id]
      },
      { 
        description: "Nada mejor que un buen asado de domingo con amigos. ¡Viva la patria!",
        user: users[3]._id,
        image: [],
        tag: [tags[3]._id, tags[9]._id]
      },
      { 
        description: "Rutina completa de hoy: sentadillas, prensa y un poco de cardio. ¡No se para!",
        user: users[2]._id,
        image: [
          { url: "https://picsum.photos/300/300?random=1" },
          { url: "https://picsum.photos/300/300?random=2" },
          { url: "https://picsum.photos/300/300?random=3" },
          { url: "https://picsum.photos/300/300?random=4" }
        ],
        tag: [tags[2]._id, tags[5]._id]
      },
      { 
        description: "Último momento: Avances significativos en la inteligencia artificial este mes.",
        user: users[1]._id,
        image: [{ url: "https://picsum.photos/300/300?random=5" }],
        tag: [tags[1]._id, tags[6]._id]
      }
    ];
    const posts = await Post.insertMany(postsData);
    console.log("5 Posts creados.");

    
    const commentsData = [
      
      { post: posts[0]._id, user: users[1]._id, text: "¡Buenísimo ese script!" },
      
      { post: posts[1]._id, user: users[3]._id, text: "Los míos hacen lo mismo jaja." },
      { post: posts[1]._id, user: users[4]._id, text: "Necesitás un teclado anti-gatos." },
      
      { post: posts[2]._id, user: users[0]._id, text: "¡Qué envidia ese asado!" },
      
      { post: posts[3]._id, user: users[4]._id, text: "¡Tremendo entrenamiento!" },
      { post: posts[3]._id, user: users[1]._id, text: "A darle con todo 💪" }
      
    ];
    await Comment.insertMany(commentsData);
    console.log("Comentarios inyectados.");

    console.log("\n¡Base de datos lista para las capturas!");
    process.exit();
  } catch (err) {
    console.error("Error en el seeding:", err);
    process.exit(1);
  }
}

seedDB();