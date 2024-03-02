const express = require('express')
const Chatrouter = express.Router()
const { getAllProductChat, deleteChatById, addChat } = require('../Controllers/chat')
const verifyJWT = require('../middleware/verifyJWT')


Chatrouter.post('/:prdId/chats', addChat)
Chatrouter.get('/:prdId/chats', verifyJWT ,getAllProductChat)
Chatrouter.delete('/:prdId/chats/:chatId', verifyJWT ,deleteChatById)


module.exports = Chatrouter

