import { Link } from "react-router-dom";

export default function ProductCard(props){
      
 

    return(
        <>
          <Link to={"/overview/"+props.product.productId} className="w-[250px] h-[400px] m-4 bg-amber-400 border">
             <img  className="w-full h-[200px] object-cover" src={props.product.images[0]}/>
             <div className="h-[200px] w-full flex flex-col justify-center items-center">
               <span className="text-lg font-bold">{props.product.name}</span>
               <p>{props.product.price}</p>
               <p>{props.product.description}</p>

             </div>
          </Link>
        </>
    )
}