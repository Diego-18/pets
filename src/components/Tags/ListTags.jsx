import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const endpoint = "http://localhost:8000/api";

export default function ListTags(props) {
	const [tags, setTags] = useState([]);

    useEffect(() => {
		getAllTags();
	}, []);

	const getAllTags = async () => {
		const response = await axios.get(`${endpoint}/tags`);
		setTags(response.data.data);
	};

	const deleteTag = async id => {
		await axios.delete(`${endpoint}/tag/${id}`);
		getAllTags();
	};

	return (
		<div className="container text-center">
			<div className="btn-new">
				<Link to="/tag" className="btn btn-success mt-3 mb-3">
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
					{tags.map(tag => (
						<tr key={tag.id}>
							<td> {tag.id} </td>
							<td> {tag.name} </td>
							<td>
								<Link
									to={`/tag/${tag.id}`}
									className="btn btn-warning m-3"
								>
									<i className="fa-solid fa-file-pen" />
								</Link>
								<button
									onClick={() => deleteTag(tag.id)}
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
