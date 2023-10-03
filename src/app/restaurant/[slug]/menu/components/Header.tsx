
function Header({slug}:{slug:string}) {

  function formatSlug(slug:string):string {
    
    const data = slug.split("-")

    data[data.length -1] = `(${data[data.length-1]})`

    return data.join(" ");
  
  }


 
  return (
    <div className="h-96 overflow-hidden">
    <div
      className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center"
    >
      <h1 className="text-7xl text-white capitalize text-shadow text-center">
       { formatSlug(slug)}
      </h1>
    </div>
  </div>
  )
}

export default Header
