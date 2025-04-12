import Joi from "joi";

 const itemSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  category: Joi.string()
    .valid("Chaves", "Eletrônicos", "Documentos", "Roupas", "Outros")
    .required(),
  date: Joi.date().iso().required(),
  location: Joi.string().min(3).max(255).required(),
  contact: Joi.string().min(10).max(15).required(),
  color: Joi.string().min(3).max(50).required(),
  photo: Joi.string().allow(null, ""),
  status: Joi.string().valid("Perdido", "Encontrado").required(),
});
