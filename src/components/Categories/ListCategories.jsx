import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const endpoint = "http://localhost:8000/api";

export default function ListCategory(props) {
	const [categories, setCategories] = useState([]);
	const MySwal = withReactContent(Swal);

    useEffect(() => {
		getAllCategories();
	}, []);

	const getAllCategories = async () => {
		const response = await axios.get(`${endpoint}/categories`);
		setCategories(response.data.data);
	};

	const deleteCategory = async id => {
		await MySwal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
			confirmButtonColor: '#0D6EFD',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
			if (result.isConfirmed) {
				axios.delete(`${endpoint}/category/${id}`);
				Swal.fire('Deleted!','Your file has been deleted.','success')
				getAllCategories();
			}
		})
	};

	return (
		<div className="container text-center">
			<div className="btn-new">
				<Link to="/category" className="btn btn-success mt-3 mb-3">
					<i className="fa fa-plus" aria-hidden="true" />
				</Link>
			</div>
			<table className="table table-striped caption-top align-middle">
                <caption>List of {props.component}</caption>
				<thead className="bg-primary text-white">
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Operations</th>
					</tr>
				</thead>
				<tbody>
					{categories.map(category => (
						<tr key={category.id}>
							<td> {category.id} </td>
							<td> {category.name} </td>
							<td>
								<Link
									to={`/category/${category.id}`}
									className="btn btn-warning m-3"
								>
									<i className="fa-solid fa-file-pen" />
								</Link>
								<button
									onClick={() => deleteCategory(category.id)}
									className="btn btn-danger"
								>
									<i
										className="fa fa-trash"
										aria-hidden="true"
									/>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
