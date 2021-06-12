const boardModel = require('../model/board')

exports.boards_get_all = async(req, res) => {
    try{
        const boards = await boardModel.find()
        .populate('email', ['email'])

        res.json({
            msg : "get boards",
            count : boards.length,
            boardInfo : boards.map(board => {
                return{
                    id : board.id,
                    user : board.user,
                    contents : board.contents,
                    boardImage : board.boardImage
                }
            })
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

exports.boards_get_board = async(req, res) => {

    const id = req.param.boardId
    try{

        const board = await boardModel.findById(id)
        .populate('user', ['email'])

        if(!board){
            return res.status(401).json({
                msg : "no board id"
            })
        }
        else{
            res.json({
                msg : "get board",
                boardInfo : {
                    id : board.id,
                    user : board.user,
                    contents : board.contents,
                    boardImage : board.boardImage
                }
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

exports.boards_post_board = async (req, res) => {

    const {user, contents} = req.body

    const newBoard = new boardModel(
        {
            user,
            contents,
            boardImage : req.file.path
        }
    )

    try{
        const board = await newBoard.save()

        res.json({
            msg : "register board",
            boardInfo : {
                id : board.id,
                user : board.user,
                constents : board.contents,
                boardImage : board.boardImage
            }
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

exports.boards_update_board = async(req, res) => {

    const id = req.param.boardId

    const updateOps = {}

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    try{
        const board = await boardModel.findByIdAndUpdate(id, {$set : updateOps})

        if(!board){
            return res.status(401).json({
                msg : "no board id"
            })
        }
        else{
            res.json({
                msg : "update board by " + id
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
}

exports.boards_delete_all = async (req, res) => {
    try{
        await boardModel.remove()

        res.json({
            msg : "delete boards"
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

exports.boards_delete_board = async(req, res) => {

    const id = req.param.boardId
    try{
        const board = await boardModel.findByIdAndRemove(id)

        if(!board){
            return res.status(401).json({
                msg : "no board id"
            })
        }
        else{
            res.json({
                msg : "delete board by " + id
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};