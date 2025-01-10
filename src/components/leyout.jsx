import { Outlet } from "react-router-dom"

function leyout() {
    return (
        <>
            <navapp />
            <div className="container">
                <Outlet />
            </div>
            <footer>ciao sono il footer</footer>

        </>
    )
}

export default leyout