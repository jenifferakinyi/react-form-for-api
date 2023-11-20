import Studentlist from "./Studentlist";
import useFetch from "./useFetch";

const Dashboard = () =>{
    const {data} =useFetch("http://localhost:4000/Students");

    return(
        <div className="home">
        {data &&<Studentlist Student={data} firstname={"All names"}/>}
    </div>

    );
}

export default Dashboard;