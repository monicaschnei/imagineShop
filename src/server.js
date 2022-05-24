import 'dotenv/config'
import express from 'express'

import { authMiddleware } from './middlewares/authMiddleware.js'
import {UserService} from './services/user-service.js'
import jwt from 'jsonwebtoken'

const app = express()
const port = 3000

app.use(express.json())

app.get('/', async (req, res) => {
  res.send('Imagine Shop')
});

app.post('/login', async (req, res)=> {
  const {email, password} = req.body;
  const userService = new UserService();
  const userLogged = await userService.login(email, password);
  if(userLogged){
    const secretKey= process.env.SECRET_KEY;
    const token = jwt.sign({user: userLogged}, secretKey,{expiresIn:"3600s"})
  
    return res.status(200).json({token})
  }
    return res.status(400).json({message: 'email ou senha inválidos.'})
});

app.use(authMiddleware);

app.post('/users', async (req,res)=>{
  console.log(req.body);
  const {name, email, password}= req.body;
  const user = {name, email, password}

  const userService = new UserService;
  await userService.create(user);
  return res.status(201).json(user);
})

app.get('/users', async(req,res)=> {
  const userService = new UserService;
  const users = await userService.findAll();
  return res.status(200).json(users);
})

app.get('/users/:id', async(req,res)=> {
  const id = req.params.id;
  const userService = new UserService;
  const users = await userService.find(id);
  if (users){
    return res.status(200).json(users);
  }
    return res.status(404).send("Usuário não encontrado");
   
  //return res.status(404).json(message:"Esta rota não existe");
})

//http://localhost:3000/users/626be1243cbfefc8d1c9da51/monica
app.delete ('/users/:id', async(req,res)=> {
  const id = req.params.id;
  const userService = new UserService;
  const users = await userService.findById(id);
  if (users) {
    await userService.delete(id)
    await userService.findById(id)
    return res.status(200).send("Usuário excluído com sucesso");
  }

  return res.status(404).send("Usuário não encontrado");
})


app.put('/users/:id', async(req,res)=> {
  const id = req.params.id;
  const {name, email, password} = req.body;
  const user={name, email, password}
  const userService = new UserService ();
  const findUser = await userService.find(id);
  console.log(findUser)
  if (findUser){
    await userService.updtae (id,user)
    return res.status(200).send("Usuário atualizado com sucesso");

  }
  return res.status(404).send("Usuário não encontrado");
})

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})

