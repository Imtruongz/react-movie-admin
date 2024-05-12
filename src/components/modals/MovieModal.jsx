import { Button, Spinner, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import Input from '../common/Input';
import { Image, Select } from 'antd';

import commonUtils from '../../utils/commonUtils';
import {
	createNewMovieApi,
	editMovieApi,
	getAllActorsMovie,
	getAllDirectorsMovie,
	getAllGenresMovie,
	getAllMovies,
} from '../../services/movieService';

import { getAllGenres } from '../../services/genreService';

import { getAllActors } from '../../services/actorService';

import { movieFields } from '../../constants/FormFields';

import { getAllCountries } from '../../services/movieService';

import { getAllDirectors } from '../../services/directorService';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const filterOption = (input, option) =>
	(option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export default function MovieModal() {
	const navigate = useNavigate();
	const { id } = useParams();
	let movieID = '';
	if (id) {
		movieID = id.split(':').filter((el) => el !== '');
	}

	const [title, setTitle] = useState('Edit');
	const [movieState, setMovieState] = useState({});
	const [previewImgURL, setPreviewImageURL] = useState(null);
	const [loading, setLoading] = useState(false);
	const [size, setSize] = useState('middle');

	// * States of genre, actor,country, director
	const [genres, setGenre] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);

	const [actors, setActor] = useState([]);
	const [selectedActors, setSelectedActors] = useState([]);

	const [country, setCountry] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState();

	const [directors, setDirector] = useState([]);
	const [selectedDirectors, setSelectedDirectors] = useState([]);

	const getCountry = async () => {
		try {
			let response = await getAllCountries('ALL');
			setCountry(response.countries);
		} catch (error) {
			console.error('Lỗi khi gọi API:', error);
		}
	};

	const getGenre = async () => {
		try {
			let response = await getAllGenres('ALL');
			setGenre(response.genres);

			let movieGenresFromDatabase = await getAllGenresMovie(movieID);
			const selectedGenresApi = movieGenresFromDatabase.moviegenres.map(
				(genre) => genre.genreID
			);
			setSelectedGenres(selectedGenresApi);
		} catch (error) {
			console.error('Lỗi khi gọi API:', error);
		}
	};

	const getActor = async () => {
		try {
			let response = await getAllActors('ALL');
			setActor(response.actors);
			let movieActorsFromDatabase = await getAllActorsMovie(movieID);
			const selectedActorsApi = movieActorsFromDatabase.movieactors.map(
				(actor) => actor.actorID
			);
			setSelectedActors(selectedActorsApi);
		} catch (error) {
			console.error('Lỗi khi gọi API:', error);
		}
	};

	const getDirector = async () => {
		try {
			let response = await getAllDirectors('ALL');
			setDirector(response.directors);
			let movieDirectorsFromDatabase = await getAllDirectorsMovie(movieID);
			const selectedDirectorsApi =
				movieDirectorsFromDatabase.moviedirectors.map(
					(director) => director.directorID
				);
			setSelectedDirectors(selectedDirectorsApi);
		} catch (error) {
			console.error('Lỗi khi gọi API:', error);
		}
	};

	const getMovie = async () => {
		try {
			if (movieID) {
				let response = await getAllMovies(movieID);
				setMovieState(response.movies);
				fetchImageAsBase64(response.movies.thumbnail);
				setSelectedCountry(response.movies.countryID);
			}
		} catch (error) {
			console.error('Lỗi khi gọi API:', error);
		}
	};

	const addMovie = async () => {
		try {
			let message = await createNewMovieApi(movieState);
			if (message.errCode === 0) {
				setTimeout(() => {
					toast('✅ Add movie successful')
					navigate('/dashboard/Movies')
				}, 1500);
			}else{
				setTimeout(() => {
					toast(`❌ ${message.ereMessage}`)
					navigate('/dashboard/Movies')
				}, 1500);
			}
			console.log(movieState);
		} catch (error) {
			console.log(error);
		}
	};

	const editMovie = async () => {
		try {
			let message = await editMovieApi(movieState);
			console.log(movieState);
			if (message.errCode === 0) {
				setTimeout(() => {
					toast('✅ Edit movie successful')
					navigate('/dashboard/Movies')
				}, 1500);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// * UseEffect
	useEffect(() => {
		getCountry();
		getGenre();
		getActor();
		getDirector();
		if (movieID) {
			getMovie();
		} else {
			setTitle('Add')
		}
	}, []);

	const handleChangeCountry = (value) => {
		setSelectedCountry(value);
		setMovieState((prevState) => ({
			...prevState,
			countryID: value,
		}));
	};

	const handleGenreChange = (value) => {
		setSelectedGenres(value);
		setMovieState((prevState) => ({
			...prevState,
			genres: value,
		}));
	};

	const handleActorChange = (value) => {
		setSelectedActors(value);
		setMovieState((prevState) => ({
			...prevState,
			actors: value,
		}));
	};

	const handleDirectorChange = (value) => {
		setSelectedDirectors(value);
		setMovieState((prevState) => ({
			...prevState,
			directors: value,
		}));
	};

	const handleChange = (e) => {
		const { id, value } = e.target;
		setMovieState((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	const handleChangeImage = async (e) => {
		let data = e.target.files;
		let file = data[0];
		if (file) {
			const base64 = await commonUtils.getBase64(file);
			const objectURL = URL.createObjectURL(file);
			setPreviewImageURL(base64);
			setMovieState((prevState) => ({
				...prevState,
				thumbnail: base64,
			}));
		}
	};

	const fetchImageAsBase64 = async (imageUrl) => {
		try {
			await setPreviewImageURL(imageUrl);
		} catch (error) {
			console.error('Error fetching image:', error);
			return null;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleSubmitMovie();
	};

	const handleSubmitMovie = () => {
		setLoading(true);
		title === 'Add' ? addMovie() : editMovie();
	};

	return (
		<div className="fixed inset-0 z-10">
			<div
				onClick={() => navigate('/dashboard/Movies')}
				className="w-full h-full bg-black opacity-50"></div>
			<div className="absolute w-7/12 h-[90%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded">
				<div className="p-4 flex justify-center flex-col items-center mt-[3%]">
					<div className="w-2/3 mb-3">
						<Typography variant="h4" color="blue-gray" className="text-xl">
							{title} movie
						</Typography>
					</div>
					<form className="w-2/3" onSubmit={handleSubmit}>
						<div className="flex justify-between">
							{movieFields.slice(0, 1).map((ele) => (
								<Input
									key={ele.id}
									id={ele.id}
									name={ele.name}
									label={ele.label}
									placeholder={ele.placeholder}
									handleChange={handleChange}
									type={ele.type}
									autoComplete={ele.autoComplete}
									required={ele.isRequired}
									classExpand={ele.classExpand}
									disable={ele.disable}
									value={movieState[ele.id]}
								/>
							))}
							<div>
								<Typography className="text-[14px] mb-1">Country</Typography>
								<Select
									showSearch
									placeholder="Select a country"
									className="w-32 h-[38px]"
									optionFilterProp="children"
									onChange={handleChangeCountry}
									filterOption={filterOption}
									options={country.map((ele) => ({
										value: ele.countryID,
										label: ele.countryName,
									}))}
									value={selectedCountry}
								/>
							</div>
						</div>
						<div className="flex gap-24">
							{movieFields.slice(1, 3).map((ele) => (
								<Input
									key={ele.id}
									id={ele.id}
									name={ele.name}
									label={ele.label}
									placeholder={ele.placeholder}
									handleChange={handleChange}
									type={ele.type}
									autoComplete={ele.autoComplete}
									required={ele.isRequired}
									disable={ele.disable}
									classExpand={ele.classExpand}
									value={movieState[ele.id]}
								/>
							))}
						</div>
						<div className="mb-4">
							<Typography className="text-[14px]">Description</Typography>
							<textarea
								className="min-h-20 max-h-28 placeholder:text-slate-400 block bg-white w-full border border-gray-400 rounded-md py-2 pl-3 pr-3 mt-1 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-blue-600 focus:ring-1 sm:text-sm"
								value={movieState.description}
								id="description"
								maxLength={5000}
								onChange={handleChange}></textarea>
						</div>
						<div className="mb-4 flex">
							<div>
								<Typography className="text-[14px]">Genre</Typography>
								<Select
									showSearch
									mode="tags"
									size={size}
									placeholder="Please select genre"
									onChange={handleGenreChange}
									tokenSeparators={[',']}
									className="w-[250px] mr-10"
									filterOption={filterOption}
									options={genres.map((genre) => ({
										value: genre.genreID,
										label: genre.name,
									}))}
									value={selectedGenres}
								/>
								<Typography className="text-[14px] mt-2">Actor</Typography>
								<Select
									showSearch
									mode="tags"
									size={size}
									placeholder="Please select actor"
									value={selectedActors}
									onChange={handleActorChange}
									tokenSeparators={[',']}
									className="w-[250px] mr-10"
									filterOption={filterOption}
									options={actors.map((actor) => ({
										value: actor.actorID,
										label: actor.name,
									}))}
								/>
								<Typography className="text-[14px] mt-2">Director</Typography>
								<Select
									showSearch
									mode="tags"
									size={size}
									placeholder="Please select actor"
									value={selectedDirectors}
									onChange={handleDirectorChange}
									tokenSeparators={[',']}
									className="w-[250px] mr-10"
									filterOption={filterOption}
									options={directors.map((director) => ({
										value: director.directorID,
										label: director.name,
									}))}
								/>
							</div>
							<div className="">
								<div className="mb-2">
									<Typography className="text-[14px]">Thumbnail</Typography>
									<div className="flex gap-4 items-center flex-col">
										<div className="border border-gray-300 rounded-md flex items-center">
											<Image
												width={280}
												height={100}
												src={previewImgURL || 'error'}
												className="rounded-md "
												fallback="data:image/png;base64,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"
											/>
										</div>
										<input
											type="file"
											id="previewImg"
											hidden
											src=""
											accept="image/*"
											onChange={(e) => handleChangeImage(e)}
										/>
										<label htmlFor="previewImg" className="cursor-pointer">
											<div className="flex w-[180px] justify-center items-center gap-3 h-9 border border-gray-300 rounded-md px-5 hover:border-blue-500 hover:shadow-md transition duration-300 py-5">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="currentColor"
													className="h-5 w-5">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
													/>
												</svg>
												<span>Upload Files</span>
											</div>
										</label>
									</div>
								</div>
							</div>
						</div>

						<div className="flex">
							<div>
								{loading ? (
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
								onClick={() => navigate('/dashboard/Movies')}>
								Cancel
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
