import axios from '../axious';

const getAllGenres = (id)=>{
    return axios.get(`/api/get-all-genre?id=${id}`,{
        genreID: id
    })
}

const handleCreateNewGenreApi = (genreData)=>{
    return axios.post('/api/create-new-genre',{
        name: genreData
    })
}

const handleUpdateGenreDataApi = (genreID,genreData) => {
	console.log(genreData)
	return axios.put('/api/edit-genre', {
		genreID: genreID,
        name: genreData
	});
};

const deleteGenreApi = (genreID)=>{
	return axios.delete('/api/delete-genre', {
		data: {
			genreID: genreID,
		},
	});
}

const searchGenreApi = (keyword)=>{
    return axios.get(`/api/get-search-genre?keyword=${keyword}`,{
        keyword: keyword
    })
}

export {
    getAllGenres,
    handleCreateNewGenreApi,
    handleUpdateGenreDataApi,
    deleteGenreApi,
    searchGenreApi
}