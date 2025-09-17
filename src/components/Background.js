function Background() {
    return (
      <div className="fixed inset-0 bg-gray-200 overflow-hidden">
        {/* Large Red Circle - Top Left */}
        <div className="absolute -top-40 -left-40 w-[750px] h-[750px] bg-red-500 rounded-full opacity-60"></div>
        
        {/* Large Red Circle - Bottom Middle */}
        <div className="absolute -bottom-40 left-2/3 transform -translate-x-1/2 w-[596px] h-[596px] bg-red-500 rounded-full opacity-60"></div>
        
        {/* Small Dark Blue Circle - Bottom Left */}
        <div className="absolute bottom-16 left-20 w-[249px] h-[249px] bg-blue-900 rounded-full opacity-60"></div>
        
        {/* Large Dark Blue Circle - Middle Right */}
        <div className="absolute top-20 -right-20 w-[474px] h-[474px] bg-blue-900 rounded-full opacity-60"></div>
        
        {/* Blurred Overlay */}
        <div className="absolute inset-0 bg-gray-200/20 backdrop-blur-3xl"></div>
      </div>
    );
  }
  
  export default Background;