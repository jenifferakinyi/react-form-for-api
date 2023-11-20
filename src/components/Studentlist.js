import React from "react";
import { Link } from "react-router-dom";

const Studentlist = ({ students }) => {
    if (!students || students.length === 0) {
        return <p>No students to display.</p>; // or some other fallback UI
    }

    return (
        <div>
            <h1 className="text-2xl font-bold pl-44 pt-3">Student List</h1>
            {students.map((student) => (
                <div className="preview font-sans border-b-white hover:shadow p-4 shadow-black pl-44" key={student.id}>
                    <Link to={`/Studentdata/${student.id}`}>
                        <h2 className="text-2xl font-bold text-violet-600">{student.firstname}</h2>
                        <p className="">done by: {student.lastname}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Studentlist;
