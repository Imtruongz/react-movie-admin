import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import MoviePage from '../pages/MoviePage';
import CategoryPage from '../pages/CategoryPage';
import ActorsPage from '../pages/ActorPage';
import DirectorPage from '../pages/DirectorPage';
import CommentPage from '../pages/CommentPage';

import AccountPage from '../pages/AccountPage';
import StatisticPage from '../pages/StatisticPage';
import Modal from './Modal';
import GenreModal from './GenreModal';
import ActorModal from './ActorModal';
import DirectorModal from './DirectorModal';
import MovieModal from './MovieModal';
import {ToastContainer} from 'react-toastify';

const NavPage = () => {
	return (
		<>
			<Routes>
				<Route path="/Home" element={<HomePage />} />
				<Route path="/Movies" element={<MoviePage />} />
				<Route path="/Categories" element={<CategoryPage />} />
				<Route path="/Actors" element={<ActorsPage />} />
				<Route path="/Directors" element={<DirectorPage />} />
				<Route path="/Comments" element={<CommentPage />} />
				<Route path="/Accounts" element={<AccountPage />} />
				<Route path="/Statistics" element={<StatisticPage />} />

				{/* Account */}
				<Route path="/Accounts/edit-user/:id" element={<Modal />} />

				{/* Category */}
				<Route path="/Categories/edit-genre/:id" element={<GenreModal />} />
				<Route path="/Categories/create-genre" element={<GenreModal />} />

				{/* Actor */}
				<Route path="/Actors/edit-actor/:id" element={<ActorModal />} />
				<Route path="/Actors/create-actor" element={<ActorModal />} />

				{/* Director */}
				<Route
					path="/Directors/edit-director/:id"
					element={<DirectorModal />}
				/>
				<Route path="/Directors/create-director" element={<DirectorModal />} />

				{/* Movie */}
				<Route path="/Movies/edit-movie/:id" element={<MovieModal />} />
				<Route path="/Movies/create-movie" element={<MovieModal />} />
			</Routes>
      <ToastContainer position="bottom-left" pauseOnHover={true} stacked={true} pauseOnFocusLoss={false}/>
		</>
	);
};

export default NavPage;
