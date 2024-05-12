import React from 'react';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Routes from '../../routes/routes';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-tailwind/react';

export default function SideBar() {
	const [open, setOpen] = useState(true);

	return (
		<div
			className={` ${
				open ? 'w-72' : 'w-20 '
			} bg-bgColorBlock text-textMain h-[calc(100vh-40px)] p-5  pt-8 relative duration-300 rounded-lg `}>
			<FontAwesomeIcon
				icon={Icons.faChevronLeft}
				className={`text-textMain absolute cursor-pointer -right-9 top-9 w-7  ${
					!open && 'rotate-180'
				}`}
				onClick={() => setOpen(!open)}
			/>
			<Tooltip
				content="Home"
				placement="right-end"
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0, y: 0, x: 1 },
				}}>
				<Link to={'/dashboard/Home'}>
					<div className="flex gap-x-4 items-center pl-2 hover:bg-hoverNavBar p-2 rounded-md group">
						<FontAwesomeIcon
							icon={Icons.faHome}
							className={`cursor-pointer duration-500 group-hover:text-active ${
								open && 'rotate-[360deg] fa-xl text-textMain'
							}`}
						/>
						<h1
							className={`origin-left font-bold text-xl duration-200 text-textMain group-hover:text-active  ${
								!open && 'scale-0'
							}`}>
							Home
						</h1>
					</div>
				</Link>
			</Tooltip>

			<ul className="pt-6">
				{Routes.map((Menu, index) => (
					<Tooltip
						content={Menu.title}
						placement="right-end"
						animate={{
							mount: { scale: 1, y: 0 },
							unmount: { scale: 0, y: 0, x: 1 },
						}}>
						<Link to={Menu.link}>
							<li
								key={index}
								className={`flex text-textMain rounded-md p-2 cursor-pointer font-medium text-sm items-center gap-x-4 hover:bg-hoverNavBar group
              ${Menu.gap ? 'mt-9' : 'mt-2'} ${index === 0} `}>
								<FontAwesomeIcon
									icon={Menu.icon}
									className="fa-xl group-hover:text-active"
								/>
								<span
									className={`${
										!open && 'hidden'
									} origin-left duration-200 text-x group-hover:text-active`}>
									{Menu.title}
								</span>
							</li>
						</Link>
					</Tooltip>
				))}
			</ul>
		</div>
	);
}
