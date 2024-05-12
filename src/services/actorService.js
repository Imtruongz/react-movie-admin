import axios from '../axious';

const getAllActors = (id)=>{
    return axios.get(`/api/actor/get-all-actors?id=${id}`,{
        actorID: id
    })
}

const createNewActorApi = (actorData)=>{
    return axios.post('/api/actor/create-new-actor',{
        actor: actorData
    })
}

const editActorApi = (actorData)=>{
    return axios.put('/api/actor/edit-actor',{
        actor: actorData
    })
}

const deleteActor = (actorID)=>{
    console.log(actorID);
	return axios.delete('/api/actor/delete-actor', {
		data: {
			actorID: actorID,
		},
	});
}

const searchActorApi = (keywords) => {
    return axios.get(`/api/actor/get-search-actor?keywords=${keywords}`,{
        keywords: keywords
    });
}

export {
    getAllActors,
    createNewActorApi,
    editActorApi,
    deleteActor,
    searchActorApi
}