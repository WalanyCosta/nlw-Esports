import React from 'react'

function handleRefresh(){
    window.location.reload();
}

function Error() {
  return (
    <div className='flex flex-col gap-14 mt-56 text-white text-lg text-center'>
        <span>Ocorreu um erro. Por favor tente novamente.</span>
        <button onClick={handleRefresh} className="bg-violet-500 text-center px-5 h-12 rounded-md font-semibold hover:bg-violet-600">
        Atualiza
        </button>
  </div>
  )
}

export default Error