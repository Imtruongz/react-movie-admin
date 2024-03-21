import { Button, Option, Select, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import Input from './Input';
import { UserFields } from '../constants/FormFields';
import { getAllUsers } from '../../services/userService';
import { handleUpdateUserDataApi } from '../../services/userService';

export default function Modal({ toggleModal, selectedUser }) {
	const [accountState, setAccountState] = useState({});

	const [roleValue, setRoleValue] = useState(accountState.roleID);
	const [genderValue, setGenderValue] = useState(accountState.gender);
	const getAccount = async () => {
		try {
			let response = await getAllUsers(selectedUser.userID);
			setAccountState(response.users)
			console.log(response.users)
		} catch (error) {
			console.error('Lỗi khi gọi API:', error);
		}
	};
	useEffect(() => {
		// Cập nhật giá trị mặc định cho Select dựa trên roleID của selectedUser
		setRoleValue(selectedUser.roleID);
		setGenderValue(selectedUser.gender);
		getAccount();
	}, []);

	const handleChange = (e) => {
		const { id, value } = e.target;
		setAccountState((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};
	

	const handleChangeRole = () => {
		setRoleValue(roleValue);
	};

	const handleChangeGeder = () => {
		setGenderValue(genderValue);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleChangeUserData();
	};

	const handleChangeUserData = async () => {
		try {
			let message = await handleUpdateUserDataApi(accountState)
			if(message.errCode === 0){
				// toggleModal
			}
		} catch (error) {
			console.log(error)
		}
	}; 

	return (
		<div className="fixed inset-0 z-10">
			<div
				onClick={toggleModal}
				className="w-full h-full bg-black opacity-50"></div>
			<div className="absolute w-7/12 h-5/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded">
				<div className="p-4 flex justify-center flex-col items-center mt-[5%]">
					<div className="w-2/3 mb-3">
						<Typography variant="h4" color="blue-gray" className="text-xl">
							Edit user
						</Typography>
					</div>
					<form className="w-2/3" onSubmit={handleSubmit}>
						<div className="">
							{UserFields.slice(0, 2).map((ele) => (
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
									value={accountState[ele.id]}
								/>
							))}
						</div>
						<div className="flex gap-8">
							{UserFields.slice(2, 4).map((ele) => (
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
									value={accountState[ele.id]}
								/>
							))}
						</div>
						<div className="mt-3 mb-6 flex gap-5">
							<Select
								label="Role"
								variant="outlined"
								color="blue"
								className="shadow-sm"
								value={roleValue}
								onChange={handleChangeRole}>
								<Option value={1}>Admin</Option>
								<Option value={2}>User</Option>
							</Select>
							<Select
								label="Gender"
								variant="outlined"
								color="blue"
								className="shadow-sm"
								value={genderValue}
								onChange={handleChangeGeder}>
								<Option value={1}>Male</Option>
								<Option value={2}>Female</Option>
							</Select>
						</div>
						<Button variant="solid" color="blue" className="w-24" onClick={handleChangeUserData}>
							Save
						</Button>
						<Button
							variant="outlined"
							color="red"
							className="ml-4"
							onClick={toggleModal}>
							Cancle
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
