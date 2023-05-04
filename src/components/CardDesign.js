function CardDesign(props) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg w-56 h-60 hover:-translate-y-1 hover:scale-100 hover:duration-300 relative ">
      <div className="z-[1] absolute top-2 right-4 px-2 py-1 rounded-r-lg rounded-l-lg bg-slate-900 text-white text-xs opacity-75">
        {props.status}
      </div>
      <img
        className="w-full h-28"
        src={props.image}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xs mb-2">{props.title}</div>
        <p className="text-gray-700 text-xs">Last updated: {props.date}</p>
        <p className="text-gray-700 text-xs">
          lessons:{props.id} minutes:{props.duration}
        </p>
      </div>
      <div className="px-6">
        <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
          {props.category}
        </span>
      </div>
    </div>
  );
}
export default CardDesign;
