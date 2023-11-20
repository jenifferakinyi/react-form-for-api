import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const Studentdata = () =>{
    const{id}= useParams()
    const{data: student}= useFetch("http://localhost:4000/Students" +id);
    return(
        <div className="details">
            <h1>Student data:{id}</h1> 
             {student && (
                    <article>
                      <h1>{student.firstname}</h1>
                        <p>Done by:{student.lastname}</p>
                           <div>{student.gender}</div>
<button class="bg-red-600 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded">Delete</button>
                        </article>
            )}
        </div>
    )
}

export default Studentdata;