export default function NotFound() {
    return(
        <>
            <div className="flex  flex-col justify-center items-center h-full">
                <h1 className="text-3xl font-bold m-[10px]">404 - Page Not Found</h1>
                <p className="text-center text-xl m-[15px]">The page you are looking for does not exist.</p>
                <div>
                    <img src="/public/not found.jpg" alt="404 Not Found" className="w-[375px] h-[275px] object-cover" />
                </div>
                <button className="flex items-center justify-between gap-2 bg-pink-800 text-white w-[200px] h-[50px] px-4 rounded-lg hover:bg-white hover:text-pink-800 border border-pink-800 cursor-pointer m-4">
                    Back to Home page
                </button>
            </div>
        </>
    )
}