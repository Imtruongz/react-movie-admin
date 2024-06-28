import axios from '../axious';

const handleGetAllComments = (id)=>{
    return axios.get(`/api/comment/get-all-comments?id=${id}`,{
        id: id
    })
}

const handleCountComment = ()=>{
    return axios.get('/api/comment/count-comment')
}

const handleDeleteComment = (commentID)=>{
    return axios.delete('/api/comment/delete-comment',{
        data: {
            id: commentID
        }
    })
}

export {
    handleGetAllComments,
    handleCountComment,
    handleDeleteComment
}