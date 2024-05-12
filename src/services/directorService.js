import axios from '../axious';

const getAllDirectors = (id)=>{
    return axios.get(`/api/director/get-all-directors?id=${id}`,{
        directorID: id
    })
}

const createNewDirectorApi = (directorData)=>{
    return axios.post('/api/director/create-new-director',{
        director: directorData
    })
}

const editDirectorApi = (directorData)=>{
    return axios.put('/api/director/edit-director',{
        director: directorData
    })
}

const deleteDirectorApi = (directorID)=>{
    console.log(directorID);
	return axios.delete('/api/director/delete-director', {
		data: {
			directorID: directorID,
		},
	});
}

const searchDirectorApi = (keyword)=>{
    return axios.get(`/api/director/get-search-director?keyword=${keyword}`,{
        keyword: keyword
    })
}

export {
    getAllDirectors,
    createNewDirectorApi,
    editDirectorApi,
    deleteDirectorApi,
    searchDirectorApi
}