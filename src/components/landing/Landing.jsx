const Landing = ()=>{
    return(
        <>
        <main>
            <div className="container border p-5 rounded m-auto mb-3 text-center">
                <p>
                    Pokedeck es un proyecto pensado para aquellos que les gusta coleccionar!
                    Es muy simple: juega, ganá puntos, abre cofres y colecciona!
                </p>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 place-items-center">
                <a href="#" className="p-2 rounded border w-72 sm:w-96 h-52 shadow flex justify-center items-center my-5">Puzzle</a>
                <a href="#" className="p-2 rounded border w-72 sm:w-96 h-52 shadow flex justify-center items-center my-5">Memoria</a>
                <a href="#" className="p-2 rounded border w-72 sm:w-96 h-52 shadow flex justify-center items-center my-5">Flappybird</a>
                <a href="#" className="p-2 rounded border w-72 sm:w-96 h-52 shadow flex justify-center items-center my-5">Quizz</a>
            </div>
        </main>
        </>
    )
}

export default Landing;