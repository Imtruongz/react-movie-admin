import { Button, Spinner, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import Input from './Input';
import { actorFields } from '../constants/FormFields';
import { DatePicker, Image } from 'antd';
import {
	createNewActorApi,
	editActorApi,
	getAllActors,
} from '../services/actorService';
import dayjs from 'dayjs';
import commonUtils from '../utils/commonUtils';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ActorModal() {
	const navigate = useNavigate();
	const { id } = useParams();
	let actorID = '';
	if (id) {
		actorID = id.split(':').filter((el) => el !== '');
	}

	const [title, setTitle] = useState('Edit');

	const [actorState, setActorState] = useState({});
	const [birthdate, setBirthDate] = useState(null);
	const [previewImgURL, setPreviewImageURL] = useState(null);

	// * Spinner
	const [click, setClick] = useState(false);

	const getActor = async () => {
		try {
			if (actorID) {
				let response = await getAllActors(actorID);
				setActorState(response.actors);
				setBirthDate(dayjs(response.actors.birthdate, 'YYYY-MM-DD'));
				fetchImageAsBase64(response.actors.image);
			}
		} catch (error) {
			console.error('Lỗi khi gọi API:', error);
		}
	};

	const addActor = async () => {
		try {
			let message = await createNewActorApi(actorState);
			if (message.errCode === 0) {
				setTimeout(() => {
					toast('✅ Add actor successful')
					navigate('/dashboard/Actors')
				}, 3000);
			}else{
				setTimeout(() => {
					toast.error(` ${message.ereMessage}`)
					navigate('/dashboard/Actors')
				}, 3000);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const editActor = async () => {
		try {
			let message = await editActorApi(actorState);
			if (message.errCode === 0) {
				setTimeout(() => {
					toast('✅ Edit actor successful')
					navigate('/dashboard/Actors')
				}, 3000);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (actorID) {
			getActor();
		} else {
			setTitle('Add');
		}
	}, []);

	const handleChange = (e) => {
		const { id, value } = e.target;
		setActorState((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	const handleChangeBirthDate = (value) => {
		const formattedBirthdate = value.format('YYYY-MM-DD');
		console.log(formattedBirthdate);
		setBirthDate(dayjs(value, 'YYYY-MM-DD'));
		console.log(dayjs(value, 'YYYY-MM-DD'));
		setActorState((prevState) => ({
			...prevState,
			birthdate: formattedBirthdate,
		}));
	};

	const handleChangeImage = async (e) => {
		let data = e.target.files;
		let file = data[0];
		if (file) {
			const base64 = await commonUtils.getBase64(file);
			const objectURL = URL.createObjectURL(file);
			console.log(objectURL);
			setPreviewImageURL(base64);
			setActorState((prevState) => ({
				...prevState,
				image: base64,
			}));
			console.log(base64);
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
		handleSubmitActor();
	};

	const handleSubmitActor = () => {
		setClick(true);
		title === 'Add' ? addActor() : editActor();
	};

	return (
		<div className="fixed inset-0 z-10">
			<div
				onClick={() => navigate('/dashboard/Actors')}
				className="w-full h-full bg-black opacity-50"></div>
			<div className="absolute w-7/12 h-5/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded">
				<div className="p-4 flex justify-center flex-col items-center mt-[3%]">
					<div className="w-2/3 mb-3">
						<Typography variant="h4" color="blue-gray" className="text-xl">
							{title} actor
						</Typography>
					</div>
					<form className="w-2/3" onSubmit={handleSubmit}>
						<div className="">
							{actorFields.slice(0, 1).map((ele) => (
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
									value={actorState[ele.id]}
									classExpand={ele.classExpand}
								/>
							))}
						</div>
						<div className="flex gap-8">
							<div className="min-w-[400px]">
								{actorFields.slice(1, 2).map((ele) => (
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
										value={actorState[ele.id]}
										classExpand={ele.classExpand}
									/>
								))}
							</div>
							<div>
								<Typography className="text-[14px]">Date of birth</Typography>
								<DatePicker
									className="h-[37px] mt-1"
									id="birthdate"
									value={birthdate}
									onChange={(value) => handleChangeBirthDate(value)}
								/>
							</div>
						</div>
						<div className="mb-4">
							<Typography className="text-[14px]">Bio</Typography>
							<textarea
								className="min-h-28 max-h-28 placeholder:text-slate-400 block bg-white w-full border border-gray-400 rounded-md py-2 pl-3 pr-3 mt-1 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-blue-600 focus:ring-1 sm:text-sm"
								value={actorState.biography}
								id="biography"
								maxLength={5000}
								onChange={handleChange}></textarea>
						</div>
						<div className="mb-4">
							<Typography className="text-[14px]">Image</Typography>
							<div className="flex gap-4 items-center">
								<div className="border border-gray-300 rounded-md flex items-center">
									<Image
										width={100}
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
									<div className="flex items-center gap-3 h-9 border border-gray-300 rounded-md px-5 hover:border-blue-500 hover:shadow-md transition duration-300 py-5">
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

						<div className="flex">
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
										onClick={handleSubmitActor}>
										Save
									</Button>
								)}
							</div>
							<Button
								variant="outlined"
								color="red"
								className="ml-4"
								onClick={() => navigate('/dashboard/Actors')}>
								Cancle
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
