import axios from '../axious';

const getAllGenres = (id)=>{
    return axios.get(`/api/genre/get-all-genre?id=${id}`,{
        genreID: id
    })
}

const handleCreateNewGenreApi = (genreData)=>{
    return axios.post('/api/genre/create-new-genre',{
        name: genreData
    })
}

const handleUpdateGenreDataApi = (genreID,genreData) => {
	console.log(genreData)
	return axios.put('/api/genre/edit-genre', {
		genreID: genreID,
        name: genreData
	});
};

const deleteGenreApi = (genreID)=>{
	return axios.delete('/api/genre/delete-genre', {
		data: {
			genreID: genreID,
		},
	});
}

const searchGenreApi = (keyword)=>{
    return axios.get(`/api/genre/get-search-genre?keyword=${keyword}`,{
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