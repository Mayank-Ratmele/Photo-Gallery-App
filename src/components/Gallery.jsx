import { useReducer, useState, useCallback, useMemo } from "react";
import useFetchPhotos from "../hooks/FetchPhotos.js";
import PhotoCard from "./PhotoCard.jsx";
import Spinner from "./Spinner.jsx";
import { favouriteReducer, initialState } from "../reducer/Reducer.js";

export default function Gallery() {

	const { photos, loading, error } = useFetchPhotos();

	const [search, setSearch] = useState("");

	const [favourites, dispatch] = useReducer(favouriteReducer, initialState);

  	// search handler
	const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
	}, []);

  	// filtered photos
	const filteredPhotos = useMemo(() => {
		return photos.filter(photo =>
			photo.author.toLowerCase().includes(search.toLowerCase())
		);
	}, [photos, search]);

  	// toggle favourite
	const toggleFav = (photo) => {
		dispatch({ type: "TOGGLE_FAV", payload: photo });
	};

  	// loading state
	if (loading) {
		return <Spinner />;
	}

  	// error state
	if (error) {
		return (
		<p className="text-center text-red-500 mt-10">
			Error: {error}
		</p>
		);
	}

	return (
		<div className="p-4">

		{/* search input */}
		<input
			type="text"
			placeholder="Search by author..."
			value={search}
			onChange={handleSearch}
			className="border p-2 mb-4 w-full rounded"
		/>

		{/* gallery grid */}
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

			{filteredPhotos.map((photo) => (
			<PhotoCard
				key={photo.id}
				photo={photo}
				isFav={favourites.some((f) => f.id === photo.id)}
				toggleFav={toggleFav}
			/>
			))}

		</div>

		</div>
	);
}