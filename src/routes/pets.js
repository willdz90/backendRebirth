const { Router } = require("express");
const { Pets } = require("../db");
const router = Router();
const {Op} = require("sequelize")

router.get("/location", async (req, res, next) => {
  try {
  const {type} = req.query
  let allPets;
  type? 
    allPets = await Pets.findAll({where : {type : type}}) :
  allPets = await Pets.findAll()  
  const allLocation= new Set()

  allPets.map(p => allLocation.add(p.location))
  let result = Array.from(allLocation); 

    result.length
    ? res.status(200).send(result.sort())
    : res.status(400).send("no");
   
  
    } catch (error) {
      next(error);
    }
});

router.get("/inactivo" , async (req, res, next) => {
  try {
    const petsInac = await Pets.findAll({ where:{
      active: {
        [Op.ne]: true
        }}
    })
    return res.status(200).send(petsInac)
  } catch (error) {
    next(error)
  }
})

router.put("/delete/:id" , async (req, res, next) =>{
  const {id} = req.params
  const petsA = await Pets.findByPk(id)
  if(petsA.dataValues.active === true){
    await Pets.update({active : false},{
      where: {id : id}
    })
    return res.status(200).send("adoptado")
  }if(petsA.dataValues.active === false){
    await Pets.update({active : true},{
      where: {id : id}
    })
    return res.status(200).send("desadoptado")
  }
})

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const petId = await Pets.findByPk(id);
    if (!petId) {
      res.status(404).send("pet not found");
    } else {
      res.status(200).send(petId);
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const petId = await Pets.findByPk(id);
    await petId.update({views:petId.views + 1})
    res.status(200).send('ok')
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
  const { type } = req.query;
  const { name } = req.query;
  const allPets = await Pets.findAll({order:[["createdAt", "ASC"]]});
  let result = allPets; 
  if (type) {
    result = await allPets.filter((p) =>
      p.type.toLowerCase().includes(type.toLowerCase())
    );
   }
  if (name) {
    result.length ? 
    result = await result.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    ): result = await allPets.filter((p) =>
    p.name.toLowerCase().includes(name.toLowerCase()))
  } 
  result.length
    ? res.status(200).send(result)
    : res.status(404).send('no se encontro mascota');
   
    } catch (error) {
      next(error);
    }
});



router.get("/", async (req, res, next) => {
  try {
    const { type, name } = req.query;
    const allPets = await Pets.findAll();

    

  } catch (error) {
      next(error);
  }
});





router.post("/", async (req, res, next) => {
  const { id, name, image, age, description, gender, size, type, race, location, userMail } =
    req.body;
  try {
    await Pets.create({
      id,
      name,
      image,
      age,
      description,
      gender,
      size,
      type,
      race,
      location,
      userMail
    });
    res.status(200).send(`the pet was created successfully`);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const petDelete = await Pets.findByPk(id);
    if (!petDelete) {
      res.status(404).send(`pet not found`);
    } else {
      await Pets.destroy({ where: { id: id } });
      res.status(200).send(id);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
