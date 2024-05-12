import { Button, Spinner, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import {
	getAllGenres,
	handleCreateNewGenreApi,
	handleUpdateGenreDataApi,
} from '../services/genreService';
import Input from './Input';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function GenreModal() {
	const [genreState, setGenreState] = useState({});
	const [value, setValue] = useState('');
	const [click, setClick] = useState(false);

	const navigate = useNavigate();
	const { id } = useParams();
	let genreID = '';
	if (id) {
		genreID = id.split(':').filter((el) => el !== '');
	}


	const [title, setTitle] = useState('Edit');

	const getGenre = async (genreID) => {
		try {
			let response = await getAllGenres(genreID);
			setGenreState(response.genres);
			setValue(response.genres.name);
		} catch (error) {
			console.error('Lỗi khi gọi API:', error);
		}
	};

	useEffect(() => {
		if (!genreID) {
			setTitle('Add');
		}
		getGenre(genreID);
	}, []);

	const handleChange = (e) => {
		const { id, value } = e.target;
		setValue(value);
		setGenreState((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setClick(true);
		title === 'Add' ? handleAddGenre() : handleChangeGenreData();
	};

	const handleAddGenre = async () => {
		try {
			let message = await handleCreateNewGenreApi(value);
			if (message.errCode === 0) {
				notify();
				setTimeout(() => {
					navigate('/dashboard/Categories');
				}, 3000);
			}else{
				// toast.error(` ${message.ereMessage}`)
				toast.error(`❌ ${message.ereMessage}`)
				setTimeout(() => {
					navigate('/dashboard/Categories');
				}, 3000);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleChangeGenreData = async () => {
		try {
			let message = await handleUpdateGenreDataApi(genreID, value);
			if (message.errCode === 0) {
				notify();
				setTimeout(() => {
					navigate('/dashboard/Categories');
				}, 3000);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const notify = () => toast(`✅ ${title} genre successful!`);

	return (
		<div className="fixed inset-0 z-10">
			<div
				onClick={() => navigate('/dashboard/Categories')}
				className="w-full h-full bg-black opacity-50"></div>
			<div className="absolute w-7/12 h-5/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded">
				<div className="p-4 flex justify-center flex-col items-center mt-[5%]">
					<div className="w-2/3 mb-3">
						<Typography variant="h4" color="blue-gray" className="text-xl">
							{title} genre
						</Typography>
					</div>
					<form
						className="w-2/3 flex flex-col justify-between"
						onSubmit={handleSubmit}>
						<Input
							key={genreID}
							id={genreID}
							name={'genre'}
							label={'Name genre'}
							placeholder={'Enter genre'}
							handleChange={handleChange}
							type={'text'}
							autoComplete={'genre'}
							required={'genre'}
							value={value}
							classExpand={'w-full'}
						/>
						<div className="mt-[60%] flex">
							<div>
								{click ? (
									<div className="w-24 bg-blue-500 flex justify-center py-2 rounded-md">
										<Spinner className="h-6 w-6" color="" />
									</div>
								) : (
									<Button
										variant="solid"
										color="blue"
										className="w-24"
										onClick={handleSubmit}>
										Save
									</Button>
								)}
							</div>
							<Button
								variant="outlined"
								color="red"
								className="ml-4"
								onClick={() => navigate('/dashboard/Categories')}>
								Cancel
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
