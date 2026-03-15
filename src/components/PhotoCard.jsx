export default function PhotoCard({ photo, isFav, toggleFav }) {
	return (
		<div className="border rounded-lg p-2 shadow">
			<img
			src={`https://picsum.photos/id/${photo.id}/400/300`}
			alt={photo.author}
			className="w-full h-48 object-cover rounded"
			/>
	
			<div className="flex justify-between items-center mt-2">
			<p className="text-sm">{photo.author}</p>
	
			<button
				onClick={() => toggleFav(photo)}
				className="text-xl"
			>
				{isFav ? "❤️" : "🤍"}
			</button>
			</div>
		</div>
		);
	}