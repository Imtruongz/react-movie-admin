import React, { useEffect } from 'react';

import { useState } from 'react';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import {
	Card,
	CardHeader,
	Typography,
	CardBody,
	IconButton,
	Tooltip,
} from '@material-tailwind/react';

// import CommentModal from "../components/CommentModal";
// import { getAllcomments, deletecommentApi } from "../services/commentService";
import PaginationFooter from '../components/common/Pagination';
import Search from '../components/common/Search';
import { handleDeleteComment, handleGetAllComments } from '../services/comment';
import { toast } from 'react-toastify';

const TABLE_HEAD = ['Ord', 'Movie', 'User name', 'Content', 'Date', 'Edit'];
const ITEMS_PER_PAGE = 6;

export default function CommentPage() {
	const [check, setCheck] = useState(false);
	const [tableRows, setTableRows] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const getComment = async () => {
		try {
			let response = await handleGetAllComments('ALL');
			setTableRows(response.comments);
		} catch (error) {
			console.error(`Lỗi khi gọi API:`, error);
		}
	};

	const deleteComment = async (commentID) => {
		try {
			setCheck(!check);
			await handleDeleteComment(commentID);
			toast.success('Delete comment success!');
		} catch (error) {
			return error;
		}
	};

	useEffect(() => {
		getComment();
	}, [check]);

	const totalPages = Math.ceil(tableRows.length / ITEMS_PER_PAGE);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const visibleItems = tableRows.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	return (
		<div className="w-full h-full flex flex-col gap-y-4">
			<div className="rounded-lg h-[calc(100vh-136px)]">
				<Card className="h-full w-full flex flex-col justify-between ">
					<div>
						<CardHeader
							floated={false}
							shadow={false}
							className="rounded-none flex flex-row justify-between items-center mt-2 my-2 mx-2">
							<Search />
						</CardHeader>
						<CardBody className="p-1 px-0">
							<table className=" w-full min-w-max table-auto text-left">
								<thead>
									<tr>
										{TABLE_HEAD.map((head, index) => (
											<th
												key={head}
												className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-3 ${
													index === TABLE_HEAD.length - 1 ? 'pl-6' : ''
												}`}>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal leading-none opacity-70">
													{head}
												</Typography>
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{visibleItems.map(
										(
											{ commentID, movieID, userName, content, commentDate },
											index
										) => {
											const isLast = index === visibleItems.length - 1;
											const classes = isLast
												? 'p-4'
												: 'p-4 border-b border-blue-gray-50';
											return (
												<tr key={commentID}>
													<td className={classes}>
														<div className="flex items-center gap-3">
															<div className="flex flex-col">
																<Typography
																	variant="small"
																	color="blue-gray"
																	className="font-normal">
																	{commentID}
																</Typography>
															</div>
														</div>
													</td>
													<td className={classes}>
														<div className="flex items-center gap-3">
															<div className="flex flex-col">
																<Typography
																	variant="small"
																	color="blue-gray"
																	className="font-normal">
																	{movieID}
																</Typography>
															</div>
														</div>
													</td>
													<td className={classes}>
														<div className="flex flex-col min-w-80">
															<Typography
																variant="small"
																color="blue-gray"
																className="font-normal">
																{userName}
															</Typography>
														</div>
													</td>
													<td className={classes}>
														<div className="flex flex-col min-w-80">
															<Typography
																variant="small"
																color="blue-gray"
																className="font-normal">
																{content}
															</Typography>
														</div>
													</td>
													<td className={classes}>
														<div className="flex flex-col min-w-80">
															<Typography
																variant="small"
																color="blue-gray"
																className="font-normal">
																{commentDate}
															</Typography>
														</div>
													</td>
													<td className={classes}>
														<Tooltip content="Delete Comment">
															<IconButton
																variant="text"
																onClick={() => deleteComment(commentID)}>
																<TrashIcon className="h-4 w-4 text-red-500" />
															</IconButton>
														</Tooltip>
													</td>
												</tr>
											);
										}
									)}
								</tbody>
							</table>
						</CardBody>
					</div>
					<PaginationFooter
						currentPage={currentPage}
						totalPages={totalPages}
						handlePrevPage={handlePrevPage}
						handleNextPage={handleNextPage}
					/>
				</Card>
			</div>
		</div>
	);
}
