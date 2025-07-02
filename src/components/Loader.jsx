const Loader = ({ size = 12, color = 'border-blue-600' }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-${size} h-${size} border-4 border-t-transparent rounded-full animate-spin ${color}`}
      ></div>
    </div>
  )
}

export default Loader
